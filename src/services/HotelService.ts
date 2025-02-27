import { v4 as uuidv4 } from 'uuid';
import { IHotelComplete, IHotelData, IHotelDto, IRegisterHotel } from "@interfaces/IHotelData";
import { IHotelRepository, IHotelService } from "types/HotelTypes";
import { IRoomRepository } from "types/RoomsTypes";
import { StatusRoom } from "@enum/EStatusRoom";

export class HotelService implements IHotelService {
    private hotelRepository: IHotelRepository;
    private roomRepository: IRoomRepository;

    constructor(hotelRepository: IHotelRepository, roomRepository: IRoomRepository){
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    updateHotel(hotel: IRegisterHotel, id: IHotelDto['id']): Promise<IHotelDto | undefined> {
        return this.hotelRepository.updateHotel(hotel, id);
    }

    registerHotel(hotel: IRegisterHotel): Promise<IHotelDto> {
        const hotelToSave: IHotelDto = {
            ...hotel,
            id: uuidv4(),
        }
        const hotelSaved = this.hotelRepository.create(hotelToSave);
        return Promise.resolve(hotelSaved);
    }

    async findHotelComplete(id: IHotelDto["id"]): Promise<IHotelComplete | undefined> {
        const hotel = await this.hotelRepository.findById(id);
        let hotelComplete: IHotelComplete | undefined = undefined;
        if (hotel) {
            const rooms = await this.roomRepository.findByHotelId(hotel.id);
            const counterRooms = rooms.reduce((counter, room)=>{
                if (room.status === StatusRoom.ENABLED) {
                    counter.activate++;
                }else if (room.status === StatusRoom.DISABLED) {
                    counter.disabled++;
                }
                return counter;
            }, { activate: 0, disabled: 0})
            hotelComplete = {
                ...hotel,
                innactivateRooms: counterRooms.disabled,
                activateRooms: counterRooms.activate,
                rooms: rooms
            }
        }
        return Promise.resolve(hotelComplete);
    }
    
    async findAllData(): Promise<IHotelData[]> {
        const hotels = await this.hotelRepository.findAll();
        const hotelsComplete = await Promise.all(
            hotels.map(async (hotel)=>{
                const rooms = await this.roomRepository.findByHotelId(hotel.id);
                const counterRooms = rooms.reduce((counter, room)=>{
                    if (room.status === StatusRoom.ENABLED) {
                        counter.activate++;
                    }else if (room.status === StatusRoom.DISABLED) {
                        counter.disabled++;
                    }
                    return counter;
                }, { activate: 0, disabled: 0})
                const hotelComplete: IHotelData = {
                    ...hotel,
                    innactivateRooms: counterRooms.disabled,
                    activateRooms: counterRooms.activate
                }
                return hotelComplete;
            })
        );
        return Promise.resolve(hotelsComplete);
    }
    
}