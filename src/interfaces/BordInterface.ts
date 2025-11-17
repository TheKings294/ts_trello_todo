import type {Card} from "../models/Card.js";
import type {CardManager} from "../manager/cardManager.js";

export interface IBord {
    name: string;
    description?: string | undefined;
    status: Array<string>;
    card: CardManager;
    createdAt: Date;
    updatedAt: Date;
}