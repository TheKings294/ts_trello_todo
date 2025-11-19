import {AbstractRepository} from "./AbstractRepository.js";
import * as fs from "node:fs";
import {readdir, readFile} from "node:fs/promises";
import {BoardManager} from "../manager/boardManager.js";
import type {BoardDTO, BoardJSON, CardJSON} from "../utils/Types.js";
import {Board} from "../models/Board.js";
import {Card} from "../models/Card.js";
import {existsSync, writeFileSync} from "node:fs";
import {mkdirSync} from "fs";

export class BoardRepository extends AbstractRepository {
    private path(board: string): string {
        return `./data/${board}.json`
    }

    public async load(): Promise<BoardManager> {
        const manager = new BoardManager();
        if (!existsSync('./data')) {
            return manager;
        }
        const saveDir= await readdir("./data");

        for (const file in saveDir) {
            const filePath = "../data/" + file;
            const content = await readFile(filePath, 'utf8');
            const objectContent: BoardJSON= JSON.parse(content);

            const cardTab: Array<Card> = [];

            objectContent.cards.forEach(card => {
                const cardObject: Card = new Card({
                    name: card.name,
                    description: card.description,
                    status: card.status,
                    id: card.id,
                });
                cardObject.setCreateAtDate(new Date(card.createAt));
                cardObject.setUpdateAtDate(new Date(card.updateAt));
                cardTab.push(cardObject);
            })

            const board: Board = new Board({
                name: objectContent.name,
                description: objectContent.description,
                status: objectContent.status,
                card: cardTab,
            })
            board.setCreateAtDate(new Date(objectContent.createAt));
            board.setUpdateAtDate(new Date(objectContent.updateAt));

            manager.addBoard(board);
        }


        return manager
    }

    public save(boardData: Board) {
        this.prepare(boardData.name);
        const CardJSON: Array<CardJSON> = this.cardListToJSON(boardData.card.getCardList());
        const BoardJSON: BoardJSON = {
            name: boardData.name,
            description: boardData.description || "",
            status: boardData.status,
            createAt: boardData.getCreatedAtDate().toISOString(),
            updateAt: boardData.getUpdateAtDate().toISOString(),
            cards: CardJSON
        }

        fs.writeFileSync(this.path(boardData.name), JSON.stringify(BoardJSON));
    }

    public delete(boardData: any) {
        const file = this.path(boardData.name);
        fs.unlink(file, (error) => {
            if (error) throw error;
        });
    }

    private prepare(name: string) {
        if (!existsSync('./data')) {
            mkdirSync('./data', {recursive: true});
            console.log('Creating Data Storage...');
        }

        if (!existsSync(this.path(name))) {
            writeFileSync(this.path(name), JSON.stringify({}), "utf-8");
            console.log('Creating Data Storage File...');
        }
    }

    private cardListToJSON(cards: Array<Card>): CardJSON[] {
        const JSON : CardJSON[] = [];

        cards.forEach(card => {
            JSON.push({
                id: card.id,
                name: card.name,
                description: card.description || "",
                status: card.status,
                createAt: card.createAt.toISOString(),
                updateAt: card.updateAt.toISOString(),
            });
        })
        return JSON;
    }
}