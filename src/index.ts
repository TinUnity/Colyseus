import http from 'http';
import {Server} from '@colyseus/core';
import { WebSocketTransport } from "@colyseus/ws-transport";
import {KhoKheRoom} from './Room/KhoKheRoom';
import {createConnection} from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const port = Number(3000);
const server = http.createServer(app);
const GameServer = new Server({
  transport: new WebSocketTransport({
    server,
  })
});

createConnection().then(async connection=>{
   console.log('TypeOrm With Mongodb');

   GameServer.define("KhoKhe",KhoKheRoom);

   GameServer.listen(port).then(()=>console.log("connected to port:"+port));
 }).catch(err=>{
   console.log(err);
 });

