
import bookingRouter from "@routes/Bookingroutes";
import roomsRouter from "@routes/RoomsRoutes";
import app from "@server/server";
import { config } from "config";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.port || config.defaultPort;

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

app.use("/v1/api/hotels-mngr/rooms", roomsRouter());
app.use("/v1/api/hotels-mngr/booking", bookingRouter());
