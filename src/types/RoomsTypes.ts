import { IRegisterRoom, IUpdateRoom, RoomData, RoomDto } from "interfaces/IRoomData";
import { Repository } from "./RepositoryTypes";
import { RoomFilter } from "interfaces/IRoomFilter";
import { IHotelDto } from "@interfaces/IHotelData";

export interface IRoomRepository extends Repository<RoomDto>{
    findFiltered(filters: RoomFilter): Promise<RoomData[]>
    findAllRooms(): Promise<RoomData[]>;
    findByHotelId(hotelId: IHotelDto['id']): Promise<RoomDto[]>
    updateRoom(room: IUpdateRoom, id: RoomDto['id']): Promise<RoomDto | undefined>
}

export interface IRoomService {
    createRoom(room: IRegisterRoom): Promise<RoomDto>;
    updateRoom(room: IUpdateRoom, id: RoomDto['id']): Promise<RoomDto | undefined>;
    findRooms(filters: RoomFilter): Promise<RoomData[]>;
    findAllRooms():  Promise<RoomData[]>;
}