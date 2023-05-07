import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    _id: any;
    id: string;
    gmail: string;
    password: string;
    isVerify: boolean;
    username: string;
}
