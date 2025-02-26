export interface RoomData {
    id: string;
    price: number;
    taxes: number;
    type:string;
    pathImg: string;
    hotelName: string;
    city: string;
    address: string;
    rating: number;
    capacity: number;
}

export interface RoomDetailData extends Omit<RoomData, 'hotelName' |'city'| 'address'| 'rating'> {
    status: string;
    location: string;
}