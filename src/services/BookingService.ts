import { BookingSummaryData } from "@interfaces/IBookingTableData";
import { IBookingRepository, IBookingService } from "types/BookingTypes";
import { EmailService } from "./EmailService";

export class BookingService implements IBookingService {
    private bookingRepository: IBookingRepository;

    constructor(repository: IBookingRepository){
        this.bookingRepository = repository;
    }

    async registerBooking(booking: BookingSummaryData): Promise<BookingSummaryData> {
        const titular = booking.guest.find((guest)=> {
            return guest.documentNumber === booking.titularId;
        })
        const bookingSaved = await this.bookingRepository.create(booking);
        if (titular && bookingSaved) {
            await EmailService.sendConfirmationEmail(bookingSaved, titular.email);
        }
        return bookingSaved;
    }


    async findBooking(id: BookingSummaryData["idBooking"]): Promise<BookingSummaryData | undefined> {
        return this.bookingRepository.findById(id);
    }


    async findAll(): Promise<BookingSummaryData[]> {
        return this.bookingRepository.findAll();
    }
    
}