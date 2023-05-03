import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Player extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    namePlayer: string
}