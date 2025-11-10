import type {Card} from "../models/Card.js";

export interface IBord {
    name: string;
    description?: string | undefined;
    status: Array<string>;
    card: Array<Card>;
    createdAt: Date;
    updatedAt: Date;
}