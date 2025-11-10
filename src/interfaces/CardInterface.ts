import type {StatusCard} from "../utils/Types.js";

export interface ICard {
    id: number;
    name: string;
    description?: string | undefined;
    status: StatusCard;
    createAt: Date;
    updateAt: Date;
}