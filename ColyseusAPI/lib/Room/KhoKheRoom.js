"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KhoKheRoom = void 0;
const colyseus_1 = require("colyseus");
const RoomState_1 = require("../schema/RoomState");
const CustomLogicGame_1 = require("./CustomLogic/CustomLogicGame");
class KhoKheRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.clientEntitys = new Map();
        this.serverTime = 0;
    }
    onCreate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("-------------- Room Is Created -------------");
            console.log(options);
            console.log("--------------------------------------------");
            this.roomOptions = options;
            if (this.roomOptions != null) {
                this.roomId = this.roomOptions["roomId"];
                this.maxClients = this.roomOptions["maxClients"];
            }
            this.setState(new RoomState_1.RoomState());
            //set up tracking server-client latency
            this.onMessage("ping", (client) => {
                client.send(0, { serverTime: this.serverTime });
            });
            this.onMessage("customMethod", (client, request) => {
                (0, CustomLogicGame_1.OnCustomMethod)(this.customMethodController, this, client, request);
            });
            this.onMessage("CreationEntity", (client, creationMessage) => {
                var _a;
                let entityViewId = (0, colyseus_1.generateId)();
                let newEntity = new RoomState_1.PlayerState().assign({
                    id: entityViewId,
                    playerId: client.id,
                });
                if (creationMessage.creationId != null)
                    newEntity.creationId = creationMessage.creationId;
                if (creationMessage.UserName != null)
                    newEntity.playerId = creationMessage.UserName;
                for (let key in creationMessage.attributes) {
                    if (key === "CreationPos") {
                        newEntity.position_X = parseFloat(creationMessage.attributes[key][0]);
                        newEntity.position_Y = parseFloat(creationMessage.attributes[key][1]);
                        newEntity.position_Z = parseFloat(creationMessage.attributes[key][2]);
                    }
                    else if (key === "CreationRot") {
                        newEntity.rotation_X = parseFloat(creationMessage.attributes[key][0]);
                        newEntity.rotation_Y = parseFloat(creationMessage.attributes[key][1]);
                        newEntity.rotation_Z = parseFloat(creationMessage.attributes[key][2]);
                    }
                    else {
                        newEntity.attributes.set(key, creationMessage.attributes[key]);
                    }
                }
                //Add State To playerStateNetwork 
                console.log("***** EntityState ******");
                this.state.playerStateNetwork.set(entityViewId, newEntity);
                this.state.playerStateNetwork.forEach((value, key) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    console.info("key=>" + key);
                    console.log("|--------------|");
                    console.log("| Id:" + ((_a = this.state.playerStateNetwork.get(key)) === null || _a === void 0 ? void 0 : _a.id));
                    console.log("| PlayerId:" + ((_b = this.state.playerStateNetwork.get(key)) === null || _b === void 0 ? void 0 : _b.playerId));
                    console.log("| CreationId:" + ((_c = this.state.playerStateNetwork.get(key)) === null || _c === void 0 ? void 0 : _c.creationId));
                    console.log("| PositionX:" + ((_d = this.state.playerStateNetwork.get(key)) === null || _d === void 0 ? void 0 : _d.position_X));
                    console.log("| PositionY:" + ((_e = this.state.playerStateNetwork.get(key)) === null || _e === void 0 ? void 0 : _e.position_Y));
                    console.log("| PositionZ:" + ((_f = this.state.playerStateNetwork.get(key)) === null || _f === void 0 ? void 0 : _f.position_Z));
                    console.log("| RotationX:" + ((_g = this.state.playerStateNetwork.get(key)) === null || _g === void 0 ? void 0 : _g.rotation_X));
                    console.log("| RotationY:" + ((_h = this.state.playerStateNetwork.get(key)) === null || _h === void 0 ? void 0 : _h.rotation_Y));
                    console.log("| RotationZ:" + ((_j = this.state.playerStateNetwork.get(key)) === null || _j === void 0 ? void 0 : _j.rotation_Z));
                    console.log("|--------------|");
                });
                //Add New Entity To Client Entity Collection
                console.log("---------------- Add Entity ----------------");
                if (this.clientEntitys.has(client.id)) {
                    (_a = this.clientEntitys.get(client.id)) === null || _a === void 0 ? void 0 : _a.push(entityViewId);
                }
                else {
                    this.clientEntitys.set(client.id, [entityViewId]);
                    for (let key of this.clientEntitys.keys()) {
                        console.log(`Key: ${key} || Value: ${this.clientEntitys.get(key)}`);
                    }
                }
            });
            const customLogic = yield (0, CustomLogicGame_1.GetCustomLogic)(this.customMethodController, options["logic"]);
            if (customLogic == null)
                console.log("No Any Custom Logic Is not Set Up");
            try {
                if (customLogic != null)
                    customLogic.InitializeLogic(this, options);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    onJoin(client) {
        console.log("--------------------------------------------");
        console.log("Client ID Joined: " + client.sessionId);
        let newStateUser = new RoomState_1.UserState().assign({
            id: client.id,
            sessionId: client.sessionId,
            isConnected: true,
        });
        this.state.userStateNetwork.set(client.sessionId, newStateUser);
        client.send("OnJoin", newStateUser);
        this.SetRoomDetailClients();
    }
    onLeave(client) {
        console.log("----------------- Leave Room -----------------");
        console.log(`***** User Leave: ${client.id} *****`);
        this.SetRoomDetailClients();
    }
    SetRoomDetailClients() {
        for (let index = 0; index < this.clients.length; index++) {
            this.clients[index].send("NumberOnJoin", this.clients.length);
            this.clients[index].send("MaxClients", this.maxClients);
        }
    }
    PlayerStateClients() {
        for (let index of this.clients)
            index.send("GetPlayerState", JSON.stringify(this.state.playerStateNetwork));
    }
}
exports.KhoKheRoom = KhoKheRoom;
