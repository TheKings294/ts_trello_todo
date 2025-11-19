import type {ICard} from "../interfaces/CardInterface.js";
import type {CardDTO, StatusCard} from "../utils/Types.js";
import {IsAlphanumeric, IsDate} from "class-validator";

export class Card implements ICard {
    @IsAlphanumeric()
    id: string;
    @IsAlphanumeric()
    name: string;
    @IsAlphanumeric()
    description?: string | undefined;
    status: StatusCard;
    @IsDate()
    createAt: Date;
    @IsDate()
    updateAt: Date;

    constructor(DTO: CardDTO) {
        this.id = DTO.id;
        this.name = DTO.name;
        this.description = DTO.description
        this.status = DTO.status;
        this.createAt = new Date(Date.now());
        this.updateAt = new Date(Date.now());
    }

    public setUpdateAtDate(date: Date): void {
        this.updateAt = date;
    }
    public setCreateAtDate(date: Date): void {
        this.createAt = date;
    }
    public getUpdateAtDate(): Date {
        return this.updateAt;
    }
    public getCreatedAtDate(): Date {
        return this.createAt;
    }

    static generateId() {
        return crypto.randomUUID().replace(/-/g, ' ')
    }
}