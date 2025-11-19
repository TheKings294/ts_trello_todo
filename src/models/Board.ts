import type {IBord} from "../interfaces/BordInterface.js";
import type {Card} from "./Card.js";
import type {BoardDTO} from "../utils/Types.js";
import {CardManager} from "../manager/cardManager.js";
import {IsAlphanumeric, IsArray, IsDate} from "class-validator";
import {DefaultValue, Required} from "../decorator/decorator.js";

export class Board implements IBord {
    @Required
    @IsAlphanumeric()
    public name: string;
    @DefaultValue("")
    @IsAlphanumeric()
    public description: string;
    @Required
    @IsArray()
    status: Array<string>;
    card: CardManager = new CardManager();
    @IsDate()
    createdAt: Date;
    @IsDate()
    updatedAt: Date;
    @IsAlphanumeric()
    odlName: string = "";

    constructor(DTO: BoardDTO) {
        this.name = DTO.name;
        this.description = DTO.description
        this.status = DTO.status;
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());

        DTO.card.forEach((card: Card) => {
            this.card.addCard(card);
        })
    }

    public setUpdateAtDate(date: Date): void {
        this.updatedAt = date;
    }

    public setCreateAtDate(date: Date): void {
        this.createdAt = date;
    }

    public getUpdateAtDate(): Date {
        return this.updatedAt;
    }

    public getCreatedAtDate(): Date {
        return this.createdAt;
    }

    public getCardManager(): CardManager {
        return this.card;
    }
}