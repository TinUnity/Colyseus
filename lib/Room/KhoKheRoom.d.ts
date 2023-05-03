import { Room, Client } from "colyseus";
import { RoomState } from "../schema/RoomState";
export declare class KhoKheRoom extends Room<RoomState> {
    clientEntitys: Map<string, string[]>;
    serverTime: number;
    roomOptions: any;
    customMethodController: any;
    customLogic: any;
    onCreate(options: any): Promise<void>;
    onJoin(client: Client): void;
    onLeave(client: Client): void;
    SetRoomDetailClients(): void;
    PlayerStateClients(): void;
}
