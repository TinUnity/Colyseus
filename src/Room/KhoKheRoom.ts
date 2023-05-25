// import { Room, Client, generateId} from "colyseus";
// import {RoomState, UserState, PlayerState} from "../schema/RoomState";
// import {OnCustomMethod,GetCustomLogic} from "./CustomLogic/CustomLogicGame";

// export class KhoKheRoom extends Room<RoomState>{
//     clientEntitys = new Map<string,string[]>();
//     serverTime: number=0;
//     roomOptions: any;
//     customMethodController: any;
//     customLogic: any;

//     async onCreate(options: any){
//         console.log("-------------- Room Is Created -------------");
//         console.log(options);
//         console.log("--------------------------------------------");
//         this.roomOptions = options;
//         if(this.roomOptions!=null)
//         {
//             this.roomId = this.roomOptions["roomId"];
//             this.maxClients = this.roomOptions["maxClients"];
//         }

//         this.setState(new RoomState());
//         //set up tracking server-client latency
//         this.onMessage("ping",(client)=>{
//             client.send(0,{serverTime: this.serverTime});
//         })

//         this.onMessage("customMethod",(client,request)=>{
//             OnCustomMethod(this.customMethodController,this,client,request);
//         });

//         this.onMessage("CreationEntity",(client,creationMessage)=>{
//             let entityViewId = generateId();
//             let newEntity = new PlayerState().assign({
//                 id: entityViewId,
//                 playerId: client.id,
//             });
            
//             if(creationMessage.creationId!=null) newEntity.creationId = creationMessage.creationId;
//             if(creationMessage.UserName!=null) newEntity.playerId = creationMessage.UserName;

//             for(let key in creationMessage.attributes){
//                 if(key === "CreationPos"){
//                     newEntity.position_X = parseFloat(creationMessage.attributes[key][0]);
//                     newEntity.position_Y = parseFloat(creationMessage.attributes[key][1]);
//                     newEntity.position_Z = parseFloat(creationMessage.attributes[key][2]);
//                 }
//                 else if(key === "CreationRot"){
//                     newEntity.rotation_X = parseFloat(creationMessage.attributes[key][0]);
//                     newEntity.rotation_Y = parseFloat(creationMessage.attributes[key][1]);
//                     newEntity.rotation_Z = parseFloat(creationMessage.attributes[key][2]);
//                 }else{
//                     newEntity.attributes.set(key,creationMessage.attributes[key]);
//                 }
//             }

//             //Add State To playerStateNetwork 
//             console.log("***** EntityState ******");
//             this.state.playerStateNetwork.set(entityViewId,newEntity);
//             this.state.playerStateNetwork.forEach((value,key) => {
//                 console.info("key=>"+key);
//                 console.log("|--------------|");
//                 console.log("| Id:"+this.state.playerStateNetwork.get(key)?.id);
//                 console.log("| PlayerId:"+this.state.playerStateNetwork.get(key)?.playerId);
//                 console.log("| CreationId:"+this.state.playerStateNetwork.get(key)?.creationId);
//                 console.log("| PositionX:"+this.state.playerStateNetwork.get(key)?.position_X);
//                 console.log("| PositionY:"+this.state.playerStateNetwork.get(key)?.position_Y);
//                 console.log("| PositionZ:"+this.state.playerStateNetwork.get(key)?.position_Z);
//                 console.log("| RotationX:"+this.state.playerStateNetwork.get(key)?.rotation_X);
//                 console.log("| RotationY:"+this.state.playerStateNetwork.get(key)?.rotation_Y);
//                 console.log("| RotationZ:"+this.state.playerStateNetwork.get(key)?.rotation_Z);
//                 console.log("|--------------|");
//             });

//             //Add New Entity To Client Entity Collection
//             console.log("---------------- Add Entity ----------------");
//             if(this.clientEntitys.has(client.id)){
//                 this.clientEntitys.get(client.id)?.push(entityViewId);
//             }  
//             else{
//                 this.clientEntitys.set(client.id,[entityViewId]);
//                 for(let key of this.clientEntitys.keys()){
//                     console.log(`Key: ${key} || Value: ${this.clientEntitys.get(key)}`);
//                 }
//             }
//         })

//         const customLogic = await GetCustomLogic(this.customMethodController,options["logic"]);
//         if(customLogic==null)
//             console.log("No Any Custom Logic Is not Set Up")
        
//         try {
//             if(customLogic!=null)
//                 customLogic.InitializeLogic(this,options);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     onJoin(client: Client){
//         console.log("--------------------------------------------");
//         console.log("Client ID Joined: "+client.sessionId);
        
//         let newStateUser = new UserState().assign({
//             id: client.id,
//             sessionId: client.sessionId,
//             isConnected: true,
//         });

//         this.state.userStateNetwork.set(client.sessionId,newStateUser);
//         client.send("OnJoin", newStateUser);
//         this.SetRoomDetailClients();
//     }

//     onLeave(client: Client){
//         console.log("----------------- Leave Room -----------------");
//         console.log(`***** User Leave: ${client.id} *****`);
//         this.SetRoomDetailClients();
//     }

//     SetRoomDetailClients() {
//         for (let index = 0; index < this.clients.length; index++) {
//             this.clients[index].send("NumberOnJoin",this.clients.length);  
//             this.clients[index].send("MaxClients",this.maxClients);        
//         }
//     }
    
//     PlayerStateClients(){
//         for(let index of this.clients)
//             index.send("GetPlayerState",JSON.stringify(this.state.playerStateNetwork));
//     }

// }