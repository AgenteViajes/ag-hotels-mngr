import { IHotelDto } from "@interfaces/IHotelData";
import { IHotelRepository } from "types/HotelTypes";
import { IRegisterRoom, IUpdateRoom, RoomData, RoomDto } from "interfaces/IRoomData";
import { IDatesFilter, RoomFilter } from "interfaces/IRoomFilter";
import { IRoomRepository, IRoomService } from "types/RoomsTypes";
import { v4 as uuidv4 } from 'uuid';
import { StatusRoom } from "@enum/EStatusRoom";
import { IBookingRepository } from "types/BookingTypes";

export class RoomService implements IRoomService {
    private roomRepository: IRoomRepository;
    private hotelRepository: IHotelRepository;
    private bookingRepository: IBookingRepository;

    constructor(
        repository: IRoomRepository,
        hotelRepository: IHotelRepository,
        bookingRepository: IBookingRepository)
    {
            
        this.roomRepository = repository;
        this.hotelRepository = hotelRepository;
        this.bookingRepository = bookingRepository;
    }

    async updateRoom(room: IUpdateRoom, id: RoomDto["id"]): Promise<RoomDto | undefined> {
        return this.roomRepository.updateRoom(room, id);
    }

    async createRoom(room: IRegisterRoom): Promise<RoomDto> {
        const registerRoom: RoomDto = {
            ...room,
            id: uuidv4(),
        }
        return this.roomRepository.create(registerRoom);
    }

    async findRooms(filters: RoomFilter): Promise<RoomData[]> {
        const validRooms = await this.roomRepository.findFiltered(filters);
        const indexedRooms = validRooms.reduce<Record<string,RoomDto[]>>((sorter, room)=>{
            if(!sorter[room.hotelId]) sorter[room.hotelId]=[];
            sorter[room.hotelId].push(room);
            return sorter;
        }, {});
        const hotels = await this.hotelRepository.findAll();
        const candidateRooms = new Set<RoomDto['id']>();
        const roomsData: RoomData[] = hotels
            .filter((hotel) => {
                const isEnabled = hotel.status === StatusRoom.ENABLED;
                const cityMatch = hotel.city === filters.city;
                return isEnabled && cityMatch;
            })
            .flatMap((hotel)=>{
                if (indexedRooms[hotel.id]) {
                    return indexedRooms[hotel.id].map((room)=>{
                        const {location, status, ...basicRoom} = room;
                        candidateRooms.add(room.id);
                        return {
                            ...basicRoom,
                            hotelName: hotel.name,
                            city: hotel.city,
                            address: hotel.address,
                            rating: hotel.rating
                        };
                    })
                } else {
                    return [];
                }
            })
        const finalRoomsId = await this.bookingRepository.findAvailability(candidateRooms, filters as IDatesFilter);
        return roomsData.filter(room => finalRoomsId.has(room.id));
    }

    async findRoomsByHotel(id: IHotelDto['id']): Promise<RoomDto[]> {
        return this.roomRepository.findByHotelId(id);
    }

    async findActivateRooms(): Promise<RoomData[]> {
        const rooms = await this.roomRepository.findAll();
        const indexedRooms = rooms.reduce<Record<string,RoomDto[]>>((sorter, room)=>{
            if(!sorter[room.hotelId]) sorter[room.hotelId]=[];
            if(room.status === StatusRoom.ENABLED) sorter[room.hotelId].push(room);
            return sorter;
        }, {});
        const hotels = await this.hotelRepository.findAll();
        const roomsData: RoomData[] = hotels
            .filter(hotel => hotel.status === StatusRoom.ENABLED)
            .flatMap((hotel)=>{
                return indexedRooms[hotel.id].map((room)=>{
                    const {location, status, ...basicRoom} = room;
                    return {
                        ...basicRoom,
                        hotelName: hotel.name,
                        city: hotel.city,
                        address: hotel.address,
                        rating: hotel.rating
                    };
                })
            })
        return roomsData;
    }
    
}