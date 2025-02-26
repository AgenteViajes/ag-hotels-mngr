import { RoomDetailData } from "./IRoomData";

export interface HotelData {
    id: string;
    name: string;
    city: string;
    address: string;
    innactivateRooms: number;
    activateRooms: number;
    status: string;
}

export interface HotelDetailData extends HotelData {
    rating: number;
    rooms: RoomDetailData[];
}

export interface RegisterHotel extends Omit<HotelDetailData, 'id'|'innactivateRooms'|'activateRooms'| 'rooms'> {}