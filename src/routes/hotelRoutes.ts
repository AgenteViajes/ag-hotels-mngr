import { Router } from "express";
import { IHotelRepository, IHotelService } from "types/HotelTypes";
import { HotelRepository } from "@repository/HotelRepository";
import { HotelService } from "@services/HotelService";
import { IRoomRepository } from "types/RoomsTypes";
import { RoomRepository } from "@repository/roomRepository";
import { IRegisterHotel } from "@interfaces/IHotelData";

const router = Router();
const hotelRepository: IHotelRepository = new HotelRepository();
const roomRepository: IRoomRepository = new RoomRepository();
const hotelService: IHotelService = new HotelService(hotelRepository,roomRepository);

const hotelRouter = () =>{
    router.get('/basic', async (req, res)=>{
        const hotels = await hotelService.findAllData();
        res.json(hotels);
    });

    router.get('/:id', async (req, res)=>{
        const hotelId = req.params.id;
        const hotelFound = await hotelService.findHotelComplete(hotelId);
        if (hotelFound) {
            res.json(hotelFound);
        }else{
            res.status(500).json({
                error: 'No se encontraron registros con los criterios seleccionados'
            });
        }
    });

    router.put('/:id', async (req, res)=>{
        const hotelId = req.params.id;
        const data: IRegisterHotel = req.body;
        const hotelFound = await hotelService.updateHotel(data, hotelId);
        if (hotelFound) {
            res.json(hotelFound);
        }else{
            res.status(500).json({
                error: 'No se encontraron registros con los criterios seleccionados'
            });
        }
    });

    router.post('/register', async (req, res)=>{
        const data: IRegisterHotel = req.body;
        const hotelSaved = await hotelService.registerHotel(data);
        res.json(hotelSaved);
    });

    return router;
}

export default hotelRouter;
