import type {ICard} from "../interfaces/CardInterface.js";
import type {CardDTO, StatusCard} from "../utils/Types.js";
import {IsAlphanumeric, IsDate} from "class-validator";
import {DefaultValue, Required} from "../decorator/decorator.js";

export class Card implements ICard {
    @Required
    @IsAlphanumeric()
    id: string;
    @Required
    @IsAlphanumeric()
    name: string;
    @DefaultValue("")
    @IsAlphanumeric()
    description: string;
    @Required
    status: StatusCard;
    @IsDate()
    createAt: Date;
    @IsDate()
    updateAt: Date;

    constructor(DTO: CardDTO) {
        this.id = DTO.id;
        this.name = DTO.name;
        this.description = typeof DTO.description === 'undefined' ? '' : DTO.description;
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