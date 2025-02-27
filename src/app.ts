import bookingRouter from "@routes/bookingRoutes";
import hotelRouter from "@routes/hotelRoutes";
import roomsRouter from "@routes/roomRoutes";
import app from "@server/server";
import { config } from "config";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.port || config.defaultPort;

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

app.use("/v1/api/hotels-mngr/room", roomsRouter());
app.use("/v1/api/hotels-mngr/booking", bookingRouter());
app.use("/v1/api/hotels-mngr/hotel", hotelRouter());

