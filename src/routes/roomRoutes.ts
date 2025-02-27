import { IRegisterRoom, IUpdateRoom } from "@interfaces/IRoomData";
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

    router.post('/register', async (req, res)=>{
        const data: IRegisterRoom = req.body;
        const roomSaved = await roomService.createRoom(data);
        res.json(roomSaved);
    });

    router.put('/:id', async (req, res)=>{
        const roomId = req.params.id;
        const roomData: IUpdateRoom = req.body;
        const roomUpdated = await roomService.updateRoom(roomData,roomId);
        if (roomUpdated) {
            res.json(roomUpdated);
        }else{
            res.status(500).json({
                error: 'No se encontraron registros con los criterios seleccionados'
            });
        }
    });

    router.post('/filter', async (req, res)=>{
        const filters: RoomFilter = req.body;
        const roomsFound = await roomService.findRooms(filters);
        res.json(roomsFound);
    });

    return router;
}

export default roomsRouter;
