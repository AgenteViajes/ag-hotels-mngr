import { IHotelComplete, IHotelData, IHotelDto, IRegisterHotel } from "@interfaces/IHotelData";
import { Repository } from "./RepositoryTypes";

export interface IHotelRepository extends Repository<IHotelDto>{
    findById(id: IHotelDto["id"]): Promise<IHotelDto | undefined>;
    findAllData(): Promise<IHotelData[]>;
}

export interface IHotelService {
    registerHotel(hotel: IRegisterHotel): Promise<IHotelDto>;
    findHotelComplete(id: IHotelDto["id"]): Promise<IHotelComplete | undefined>;
    findAllData():  Promise<IHotelData[]>;
}