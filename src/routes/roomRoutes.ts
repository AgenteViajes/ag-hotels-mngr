import { Router } from "express";
import { RoomFilter } from "interfaces/IRoomFilter";
import { RoomRepository } from "repository/roomRepository";
import { RoomService } from "services/RoomService";
import { IRoomRepository, IRoomService } from "types/RoomsTypes";

const router = Router();

const roomRepository: IRoomRepository = new RoomRepository();
const roomService: IRoomService = new RoomService(roomRepository);

const roomsRouter = () =>{

    router.get('/', async (req, res)=>{
        const roomsFound = await roomService.findAllRooms();
        res.json(roomsFound);
    });

    router.post('/filter', async (req, res)=>{
        const filters: RoomFilter = req.body;
        const roomsFound = await roomService.findRooms(filters);
        res.json(roomsFound);
    });

    return router;
}

export default roomsRouter;
