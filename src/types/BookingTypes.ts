import { RoomDto } from "@interfaces/IRoomData";
import { IDatesFilter } from "@interfaces/IRoomFilter";
import { Repository } from "./RepositoryTypes";
import { BookingSummaryData, BookingTableData } from "@interfaces/IBookingTableData";

export interface IBookingRepository extends Repository<BookingSummaryData>{
    findById(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined>;
    findAvailability(idRooms: Set<RoomDto['id']>, dates: IDatesFilter): Promise<Set<RoomDto['id']>>
    findAllBasic(): Promise<BookingTableData[]>;
}

export interface IBookingService {
    registerBooking(booking: BookingSummaryData): Promise<BookingSummaryData>;
    findBooking(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined>;
    findAllBasic():  Promise<BookingTableData[]>;
}