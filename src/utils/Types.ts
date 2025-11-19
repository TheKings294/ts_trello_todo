import type {Card} from "../models/Card.js";
import type {Board} from "../models/Board.js";

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
export type ExecReturnList = {success: boolean; message: string, data: Array<Board | Card>};