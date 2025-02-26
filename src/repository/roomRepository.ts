import { RoomData } from "interfaces/IRoomData";
import { RoomFilter } from "interfaces/IRoomFilter";
import { defaultDataRooms } from "MockData/mockRooms";
import { IRoomRepository } from "types/RoomsTypes";

export class RoomRepository implements IRoomRepository {
    private rooms: RoomData[] = defaultDataRooms;

    findFiltered(filters: RoomFilter): Promise<RoomData[]> {
        const roomsFiltered = this.rooms.filter((room)=>{
            const cityMatches = (room.city === filters.city);
            const isCapacityAllowed = (room.capacity >= filters.peopleCount);
            return cityMatches && isCapacityAllowed;
        });
        return Promise.resolve(roomsFiltered);
    }

    create(data: RoomData): Promise<RoomData> {
        this.rooms.push(data);
        return Promise.resolve(data);
    }


    findAll(): Promise<RoomData[]> {
        return Promise.resolve(this.rooms);
    }
}