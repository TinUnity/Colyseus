import { Schema, MapSchema } from "@colyseus/schema";
export declare class PlayerState extends Schema {
    id: string;
    playerId: string;
    creationId: string;
    position_X: number;
    position_Y: number;
    position_Z: number;
    rotation_X: number;
    rotation_Y: number;
    rotation_Z: number;
    rotation_W: number;
    velocity_X: number;
    velocity_Y: number;
    velocity_Z: number;
    attributes: MapSchema<string, string>;
}
export declare class UserState extends Schema {
    id: string;
    sessionId: string;
    isConnected: boolean;
    timeStamp: number;
    attributes: MapSchema<string, string>;
}
export declare class RoomState extends Schema {
    playerStateNetwork: MapSchema<PlayerState, string>;
    userStateNetwork: MapSchema<UserState, string>;
    attributes: MapSchema<string, string>;
}
