import { RoomData } from "interfaces/IRoomData";
import { Repository } from "./RepositoryTypes";
import { RoomFilter } from "interfaces/IRoomFilter";

export interface IRoomRepository extends Repository<RoomData>{
    findFiltered(filters: RoomFilter): Promise<RoomData[]>
}

export interface IRoomService {
    createRoom(room: RoomData): Promise<RoomData>;
    findRooms(filters: RoomFilter): Promise<RoomData[]>;
    findAllRooms():  Promise<RoomData[]>;
}