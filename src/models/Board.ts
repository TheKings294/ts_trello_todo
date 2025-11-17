import type {IBord} from "../interfaces/BordInterface.js";
import type {Card} from "./Card.js";
import type {BoardDTO} from "../utils/Types.js";
import {CardManager} from "../manager/cardManager.js";

export class Board implements IBord {
    public name: string;
    public description?: string | undefined;
    status: Array<string>;
    card: CardManager = new CardManager();
    createdAt: Date;
    updatedAt: Date;

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
}