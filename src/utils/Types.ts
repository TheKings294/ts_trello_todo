import type {Card} from "../models/Card.js";

export type StatusCard = Array<string>;

export type CardDTO = {
    id: number;
    name: string;
    description?: string;
    status: StatusCard;
    createAt: Date;
    updateAt: Date;
}
export type BoardDTO = {
    name: string;
    description?: string | undefined;
    status: Array<string>;
    card: Array<Card>;
}