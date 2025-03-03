import { IBookingRepository } from "types/BookingTypes";
import { BookingSummaryData, BookingTableData } from "@interfaces/IBookingTableData";
import { v4 as uuidv4 } from 'uuid';
import { defaultDataBookings } from "@MockData/mockBookings";
import { RoomDto } from "@interfaces/IRoomData";
import { IDatesFilter } from "@interfaces/IRoomFilter";
import moment from "moment";
import { isAfter, isBefore } from "@formkit/tempo";


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

    async findBookings(idRoom: RoomDto['id']): Promise<BookingSummaryData[]>{
        return Promise.resolve(this.bookings.filter(booking => booking.room.id === idRoom)); 
    }

    async findAvailability(idRooms: Set<RoomDto['id']>, dates: IDatesFilter): Promise<Set<RoomDto['id']>>{
        const roomsIdSet = new Set(idRooms);
        const occupiedRooms = new Set<RoomDto['id']>();
        this.bookings.forEach((booking) => {
            if (roomsIdSet.has(booking.room.id)) {
                const searchStartDate = moment(dates.startDate,'DD/MM/YYYY').toDate();;
                const searchEndDate = moment(dates.endDate,'DD/MM/YYYY').toDate();;
                const bookingStartDate = moment(booking.startDate,'DD/MM/YYYY').toDate();
                const bookingEndDate = moment(booking.endDate,'DD/MM/YYYY').toDate();
                if (!(isAfter(searchStartDate,bookingEndDate) || isBefore(searchEndDate,bookingStartDate))) {
                    occupiedRooms.add(booking.room.id);
                }
            }
        }); 
        const availableRooms = new Set([...idRooms].filter(roomId => !occupiedRooms.has(roomId))); 
        return Promise.resolve(availableRooms);
    }

}