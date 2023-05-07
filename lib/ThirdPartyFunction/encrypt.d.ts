declare function encryptPassword(password: any, saltRound: any): Promise<any>;
declare function dencryptPassword(password: any, cryptPassword: any): Promise<any>;
export { encryptPassword, dencryptPassword };
