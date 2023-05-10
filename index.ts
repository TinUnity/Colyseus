import http from 'http';
import express from 'express';
import cors from 'cors';
import {Server} from 'colyseus';
import {KhoKheRoom} from './src/Room/KhoKheRoom';
import {createConnection} from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = Number(process.env.PORT || 3000);
const server = http.createServer(app);
const GameServer = new Server({
   server,
});

createConnection().then(async connection=>{
   console.log('TypeOrm With Mongodb');
   app.use(require('./src/Routers/index'));

   GameServer.define("KhoKhe",KhoKheRoom);

   GameServer.listen(port).then(()=>console.log("connected to port:"+port));
 }).catch(err=>{
   console.log(err);
 });

