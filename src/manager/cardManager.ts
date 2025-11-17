import type {Card} from "../models/Card.js";

export class CardManager {
    private card : Card[] = [];

    public addCard(card: Card) {
        this.card.push(card);
    }

    public findByName(name: string): Card | boolean {
        if (typeof name !== "string") return false;
        return this.card.find(b => b.name === name) || false;
    }
}