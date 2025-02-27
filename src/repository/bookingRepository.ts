import { IBookingRepository } from "types/BookingTypes";
import { BookingSummaryData, BookingTableData } from "@interfaces/IBookingTableData";
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

    async findAllBasic(): Promise<BookingTableData[]> {
        const bookingsBasic: BookingTableData[] = this.bookings.map((booking)=>{
            const titular = booking.guest.find(titular=> titular.documentNumber === booking.titularId);
            const titularName = [titular?.firstName, titular?.secondName, titular?.firstLastname, titular?.secondLastname].join(' ');
            const bookingBasic: BookingTableData ={
                idBooking: booking.idBooking,
                guestNumber: booking.guest.length,
                startDate: booking.startDate,
                endDate: booking.endDate,
                titularName: titularName,
                HotelName: booking.room.hotelName
            }
            return bookingBasic;
        })
       return Promise.resolve(bookingsBasic);
    }

}