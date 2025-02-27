import { Repository } from "./RepositoryTypes";
import { BookingSummaryData, BookingTableData } from "@interfaces/IBookingTableData";

export interface IBookingRepository extends Repository<BookingSummaryData>{
    findById(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined>;
    findAllBasic(): Promise<BookingTableData[]>;
}

export interface IBookingService {
    registerBooking(room: BookingSummaryData): Promise<BookingSummaryData>;
    findBooking(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined>;
    findAllBasic():  Promise<BookingTableData[]>;
}