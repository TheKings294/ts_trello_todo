import type {Card} from "../models/Card.js";

export class CardManager {
    private card : Card[] = [];

    public addCard(card: Card) {
        this.card.push(card);
    }

    public findByName(id: string): Card | undefined {
        return this.card.find(b => b.id === id);
    }

    public deleteCard(card: Card): void  {
        this.card.splice(this.card.indexOf(card), 1);
    }

    public getCardList(): Card[] {
        return this.card;
    }
}