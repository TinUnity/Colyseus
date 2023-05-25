// import {Client} from "colyseus";

// export async function GetCustomLogic(customMethod: any, fileName: string) {
//     try {
//         customMethod = await import('../CustomLogic/'+fileName+'.ts');
//     } catch (error) {
//         console.log(error);
//     }

//     return customMethod;
// }

// export function OnCustomMethod(customMethod: any,roomClass: any,client: Client, request: any) {
//     try {
//         if(customMethod!=null)
//             customMethod.ProcessMethod(roomClass,client,request);
//         else
//             console.log("No Any Custom Logic Method Is not Set up");
//     } catch (error) {
//         console.log("Error:"+error);
//     }
// }