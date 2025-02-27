import { RoomDto } from "./IRoomData";

export interface IHotelDto {
    id: string;
    name: string;
    city: string;
    address: string;
    rating: number;
    status: string;
}

export interface IHotelData extends IHotelDto {
    innactivateRooms: number;
    activateRooms: number;
}

export interface IHotelComplete extends IHotelData {
    rooms: RoomDto[]
}

export interface IRegisterHotel extends Omit<IHotelDto, 'id'> {}