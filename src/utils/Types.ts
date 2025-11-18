import type {Card} from "../models/Card.js";

export type StatusCard = string;

export type CardDTO = {
    id: string;
    name: string;
    description?: string | undefined;
    status: StatusCard;
    createAt?: Date;
    updateAt?: Date;
}
export type BoardDTO = {
    name: string;
    description?: string | undefined;
    status: Array<string>;
    card: Array<Card>;
}

export type ExecReturn = {success: boolean; message: string};