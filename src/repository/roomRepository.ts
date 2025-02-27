import { IHotelDto } from "@interfaces/IHotelData";
import { dfDataRoomsDto } from "@MockData/mockRoomsDto";
import { IUpdateRoom, RoomData, RoomDto } from "interfaces/IRoomData";
import { RoomFilter } from "interfaces/IRoomFilter";
import { defaultDataRooms } from "MockData/mockRooms";
import { IRoomRepository } from "types/RoomsTypes";

export class RoomRepository implements IRoomRepository {
    private rooms: RoomData[] = defaultDataRooms;
    private roomsData: RoomDto[] = dfDataRoomsDto;
    
    findFiltered(filters: RoomFilter): Promise<RoomData[]> {
        const roomsFiltered = this.rooms.filter((room)=>{
            const cityMatches = (room.city === filters.city);
            const isCapacityAllowed = (room.capacity >= filters.peopleCount);
            return cityMatches && isCapacityAllowed;
        });
        return Promise.resolve(roomsFiltered);
    }
    
    create(data: RoomDto): Promise<RoomDto> {
        this.roomsData.push(data);
        return Promise.resolve(data);
    }

    updateRoom(room: IUpdateRoom, id: RoomDto["id"]): Promise<RoomDto | undefined> {
        const roomFound = this.roomsData.find(room => room.id === id);
        if (roomFound) {
            roomFound.location = room.location;
            roomFound.price = room.price;
            roomFound.status = room.status;
            roomFound.taxes = room.taxes;
            roomFound.type = room.type;
        }
        return Promise.resolve(roomFound);
    }

    findAll(): Promise<RoomDto[]> {
        return Promise.resolve(this.roomsData);
    }

    findAllRooms(): Promise<RoomData[]> {
        return Promise.resolve(this.rooms);
    }

    findByHotelId(hotelId: IHotelDto['id']): Promise<RoomDto[]> {
        const roomsFound = this.roomsData.filter((room)=>{
            return room.hotelId === hotelId;
        })
        return Promise.resolve(roomsFound);
    }
}