import { RoomData } from "interfaces/IRoomData";
import { RoomFilter } from "interfaces/IRoomFilter";
import { IRoomRepository, IRoomService } from "types/RoomsTypes";

export class RoomService implements IRoomService {
    private roomRepository: IRoomRepository;

    constructor(repository: IRoomRepository){
        this.roomRepository = repository;
    }

    async createRoom(room: RoomData): Promise<RoomData> {
        return this.roomRepository.create(room);
    }

    async findRooms(filters: RoomFilter): Promise<RoomData[]> {
        return this.roomRepository.findFiltered(filters);
    }

    async findAllRooms(): Promise<RoomData[]> {
        return this.roomRepository.findAll();
    }
    
}