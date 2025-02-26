import { Repository } from "./RepositoryTypes";
import { BookingSummaryData } from "@interfaces/IBookingTableData";

export interface IBookingRepository extends Repository<BookingSummaryData>{
    findById(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined>;
}

export interface IBookingService {
    registerBooking(room: BookingSummaryData): Promise<BookingSummaryData>;
    findBooking(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined>;
    findAll():  Promise<BookingSummaryData[]>;
}