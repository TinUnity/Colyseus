// import {Schema,MapSchema,type} from "@colyseus/schema";

// export class PlayerState extends Schema{
//     @type('string') id: string="";
//     @type('string') playerId: string ="";
//     @type('string') creationId: string ="";
//     @type('number') position_X: number=0;
//     @type('number') position_Y: number=0;
//     @type('number') position_Z: number=0;
//     @type('number') rotation_X: number=0;
//     @type('number') rotation_Y: number=0;
//     @type('number') rotation_Z: number=0;
//     @type('number') rotation_W: number=0;
//     @type('number') velocity_X: number=0;
//     @type('number') velocity_Y: number=0;
//     @type('number') velocity_Z: number=0;
//     @type({map:'string'}) attributes = new MapSchema<string>();
// } 

// export class UserState extends Schema{
//     @type('string') id: string;
//     @type('string') sessionId: string;
//     @type('boolean') isConnected: boolean;
//     @type('number') timeStamp: number;
//     @type({map:'string'}) attributes = new MapSchema<string>();
// }

// export class RoomState extends Schema{
//     @type({map: PlayerState}) playerStateNetwork = new MapSchema<PlayerState>();
//     @type({map: UserState}) userStateNetwork = new MapSchema<UserState>();
//     @type({map:'string'}) attributes = new MapSchema<string>();
// }