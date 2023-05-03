import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ObjectIdColumn } from "typeorm"

@Entity()
export class User extends BaseEntity{
    @ObjectIdColumn()
    _id: any

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    gmail: string

    @Column()
    password: string

    @Column()
    isVerify: boolean

    @Column()
    username: string
}