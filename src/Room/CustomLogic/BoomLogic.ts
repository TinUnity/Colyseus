// import {KhoKheRoom} from "../KhoKheRoom";

// const currentGameState = "CurrentGameState";
// const lastState = "LastGameState";

// const ServerGameState = {
//     None: "None",
//     Waiting: "Waiting",
//     BeginRound: "BeginRound",
//     EndRound: "EndRound",
// }
// var roomOptions: any;

// const setRoomAttribute = function (roomRef: KhoKheRoom, key: string, value: string) {
//     roomRef.state.attributes.set(key,value);
// }

// exports.InitializeLogic = function (roomRef: KhoKheRoom,options : any) {
//     roomOptions = options;

//     console.log("-------------- Set Attribute ---------------");
//     setRoomAttribute(roomRef,currentGameState,ServerGameState.Waiting);
//     setRoomAttribute(roomRef,lastState,ServerGameState.None);
// }