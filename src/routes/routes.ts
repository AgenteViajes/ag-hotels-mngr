import { Router } from "express";
import { RoomFilter } from "interfaces/IRoomFilter";
import { RoomRepository } from "repository/roomRepository";
import { RoomService } from "services/RoomService";
import { IRoomRepository, IRoomService } from "types/RoomsTypes";

const router = Router();

const roomRepository: IRoomRepository = new RoomRepository();
const roomService: IRoomService = new RoomService(roomRepository);

export default () =>{
    router.get('/health', (req, res)=>{
        res.send('Api is healthy!!!')
    });

    router.get('/rooms', async (req, res)=>{
        const roomsFound = await roomService.findAllRooms();
        res.json(roomsFound);
    });

    router.post('/rooms/filter', async (req, res)=>{
        const filters: RoomFilter = req.body;
        const roomsFound = await roomService.findRooms(filters);
        res.json(roomsFound);
    });

    return router;
}
