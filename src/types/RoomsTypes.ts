import { RoomData, RoomDto } from "interfaces/IRoomData";
import { Repository } from "./RepositoryTypes";
import { RoomFilter } from "interfaces/IRoomFilter";
import { IHotelDto } from "@interfaces/IHotelData";

export interface IRoomRepository extends Repository<RoomData>{
    findFiltered(filters: RoomFilter): Promise<RoomData[]>
    findByHotelId(hotelId: IHotelDto['id']): Promise<RoomDto[]>
}

export interface IRoomService {
    createRoom(room: RoomData): Promise<RoomData>;
    findRooms(filters: RoomFilter): Promise<RoomData[]>;
    findAllRooms():  Promise<RoomData[]>;
}