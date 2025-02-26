import { BookingRepository } from "@repository/bookingRepository";
import { BookingService } from "@services/BookingService";
import { IBookingRepository, IBookingService } from "types/BookingTypes";
import { Router } from "express";
import { BookingSummaryData } from "@interfaces/IBookingTableData";

const router = Router();
const bookingRepository: IBookingRepository = new BookingRepository();
const bookingService: IBookingService = new BookingService(bookingRepository);

const bookingRouter = () =>{
    router.get('/:id', async (req, res)=>{
        const bookingId = req.params.id;
        const bookingFound = await bookingService.findBooking(bookingId);
        if (bookingFound) {
            res.json(bookingFound);
        }else{
            res.status(500).json({
                error: 'No se encontraron registros con los criterios seleccionados'
            });
        }
    });

    router.get('/', async (req, res)=>{
        const bookingsFound = await bookingService.findAll();
        res.json(bookingsFound);
    });

    router.post('/register', async (req, res)=>{
        const data: BookingSummaryData = req.body;
        const booking = await bookingService.registerBooking(data);
        res.json(booking);
    });

    return router;
}

export default bookingRouter;
