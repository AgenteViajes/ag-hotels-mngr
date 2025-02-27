import { IHotelRepository } from "types/HotelTypes";
import { IHotelDto, IHotelData, IRegisterHotel } from "@interfaces/IHotelData";
import { defaultDataHotel } from "@MockData/mockHotels";


export class HotelRepository implements IHotelRepository {

    private hotels: IHotelDto[] = defaultDataHotel;

    async findById(id: IHotelDto["id"]): Promise<IHotelDto | undefined> {
        const hotelFound = this.hotels.find((hotel)=>{
            return hotel.id === id;
        })
        return Promise.resolve(hotelFound);
    }
    async findAllData(): Promise<IHotelData[]> {
        throw new Error("Method not implemented.");
    }
    async create(data: IHotelDto): Promise<IHotelDto> {
        this.hotels.push(data);
        return Promise.resolve(data);
    }
    async updateHotel(hotel: IRegisterHotel, id: IHotelDto["id"]): Promise<IHotelDto | undefined> {
        const hotelFound = this.hotels.find(hotel => hotel.id === id);
        if (hotelFound) {
            hotelFound.name = hotel.name;
            hotelFound.address = hotel.address;
            hotelFound.city = hotel.city;
            hotelFound.rating = hotel.rating;
            hotelFound.status = hotel.status;
        }
        return Promise.resolve(hotelFound);
    }

    async findAll(): Promise<IHotelDto[]> {
        return Promise.resolve(this.hotels);
    }
}