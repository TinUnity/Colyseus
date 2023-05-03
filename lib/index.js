"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colyseus_1 = require("colyseus");
const KhoKheRoom_1 = require("./Room/KhoKheRoom");
const ConnectMongoose_1 = require("./Mongoose/ConnectMongoose");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number(process.env.PORT || 3000);
const server = http_1.default.createServer(app);
const GameServer = new colyseus_1.Server({
    server,
});
ConnectMongoose_1.connectDb;
GameServer.define("KhoKhe", KhoKheRoom_1.KhoKheRoom);
GameServer.listen(port).then(() => console.log("connected to port:" + port));
