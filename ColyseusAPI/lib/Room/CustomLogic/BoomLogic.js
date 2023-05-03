"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currentGameState = "CurrentGameState";
const lastState = "LastGameState";
const ServerGameState = {
    None: "None",
    Waiting: "Waiting",
    BeginRound: "BeginRound",
    EndRound: "EndRound",
};
var roomOptions;
const setRoomAttribute = function (roomRef, key, value) {
    roomRef.state.attributes.set(key, value);
};
exports.InitializeLogic = function (roomRef, options) {
    roomOptions = options;
    console.log("-------------- Set Attribute ---------------");
    setRoomAttribute(roomRef, currentGameState, ServerGameState.Waiting);
    setRoomAttribute(roomRef, lastState, ServerGameState.None);
};
