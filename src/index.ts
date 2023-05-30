import http from 'http';
import {Server} from '@colyseus/core';
import { WebSocketTransport } from "@colyseus/ws-transport";
import {KhoKheRoom} from './Room/KhoKheRoom';

const port = Number(3000);
const server = http.createServer();
const GameServer = new Server({
  transport: new WebSocketTransport({
    server,
  })
});


GameServer.define("KhoKhe",KhoKheRoom);

GameServer.listen(port).then(()=>console.log("connected to port:"+port));
