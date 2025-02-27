import { IHotelDto } from "@interfaces/IHotelData";
import { IRegisterRoom, IUpdateRoom, RoomData, RoomDto } from "interfaces/IRoomData";
import { RoomFilter } from "interfaces/IRoomFilter";
import { IRoomRepository, IRoomService } from "types/RoomsTypes";
import { v4 as uuidv4 } from 'uuid';

export class RoomService implements IRoomService {
    private roomRepository: IRoomRepository;

    constructor(repository: IRoomRepository){
        this.roomRepository = repository;
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
        return this.roomRepository.findFiltered(filters);
    }

    async findRoomsByHotel(id: IHotelDto['id']): Promise<RoomDto[]> {
        return this.roomRepository.findByHotelId(id);
    }

    async findAllRooms(): Promise<RoomData[]> {
        return this.roomRepository.findAllRooms();
    }
    
}