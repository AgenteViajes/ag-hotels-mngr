import { Router } from "express";

const router = Router();

export default () =>{
    router.get('/health', (req, res)=>{
        res.send('Api is healthy!!!')
    })

    return router;
}
