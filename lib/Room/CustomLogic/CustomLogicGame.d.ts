import { Client } from "colyseus";
export declare function GetCustomLogic(customMethod: any, fileName: string): Promise<any>;
export declare function OnCustomMethod(customMethod: any, roomClass: any, client: Client, request: any): void;
