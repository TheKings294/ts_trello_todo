import type {ICard} from "../interfaces/CardInterface.js";
import type {CardDTO, StatusCard} from "../utils/Types.js";

export class Card implements ICard {
    id: number;
    name: string;
    description?: string | undefined;
    status: StatusCard;
    createAt: Date;
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
        return crypto.randomUUID().replace(/-/g, ' ').slice(0, length);
    }
}