export interface RoomDto {
    id: string;
    price: number;
    taxes: number;
    type:string;
    pathImg: string;
    hotelId: string;
    capacity: number;
    location: string;
    status: string;
}
export interface IRegisterRoom extends Omit<RoomDto, 'id'> {}

export interface IUpdateRoom extends Omit<RoomDto, 'id' | 'pathImg' | 'hotelId' | 'capacity'> {}

export interface RoomData extends Omit<RoomDto, 'hotelId'| 'location'| 'status'> {
    hotelName: string;
    city: string;
    address: string;
    rating: number;
}