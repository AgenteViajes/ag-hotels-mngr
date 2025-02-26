import { IBookingRepository } from "types/BookingTypes";
import { BookingSummaryData } from "@interfaces/IBookingTableData";
import { v4 as uuidv4 } from 'uuid';
import { defaultDataBookings } from "@MockData/mockBookings";


export class BookingRepository implements IBookingRepository {
    private bookings: BookingSummaryData[] = defaultDataBookings;

    async findById(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData| undefined> {
        const booking = this.bookings.find((booking)=>{
            return booking.idBooking === id;
        })
        return Promise.resolve(booking);
    }
    async create(data: BookingSummaryData): Promise<BookingSummaryData> {
        const bookingSaved: BookingSummaryData = {
            ...data,
            idBooking: uuidv4(),
        }
        this.bookings.push(bookingSaved);
        return Promise.resolve(bookingSaved);
    }

    async findAll(): Promise<BookingSummaryData[]> {
       return Promise.resolve(this.bookings);
    }

}