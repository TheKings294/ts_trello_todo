import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {AbstractManager} from "../manager/abstractManager.js";
import type {Command} from "commander";
import type {CardManager} from "../manager/cardManager.js";
import type {ExecReturn, ExecReturnList} from "../utils/Types.js";
import type {Board} from "../models/Board.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {Card} from "../models/Card.js";

export class ListCardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "lits-card";
    }

    public getDescription(): string {
        return "List the card of an board";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<board-name>", "Board name, where the card is store")
            .option("--search <search>", "Search in card name an description")
            .option("-s, --status <status>", "Search card by status")
            .option("-c, --created <date>", "Search card by date of creation")
            .option("-e, --edited <date>", "Search card by date of edition")
            .option("--created-after <date>", "Search card by date of creation after x")
            .option("--created-before <date>", "Search card by date of creation before x")
            .action((boardName: string, option): void => {
                const data: Record<string, string> = {
                    nameBoard: boardName
                }
                const fields = ["search", "created", "edited", "createdAfter", "createdBefore"] as const;
                for (const key of fields) {
                    if (option[key] !== undefined) {
                        (data as any)[key] = option[key];
                    }
                }

                const result = this.exec(data)
                this.printResult(result)
            })
    }

    public exec(args: Record<string, string>): ExecReturn | ExecReturnList {
        const actions = ["search", "created", "edited", "createdAfter", "createdBefore"] as const;

        const board: Board | undefined = this.manager.findByName(args.nameBoard as string)
        if (!board) {
            return {success: false, message: "No board found."};
        }

        let cardList : Card[] = board.getCardManager().getCardList();

        if (cardList.length === 0) {
            return {success: false, message: "Card list is empty"};
        }
        if (args.search) {
            cardList = cardList.filter(card =>
                card.name.includes(args.search as string) ||
                card.description?.includes(args.search as string))

            if (this.isEmptyList(cardList)) return {success: true, message: "Card list is empty", data: cardList};
        }
        if (args.created) {
            const dateSearch = new Date(args.created);
            cardList = cardList.filter(card => card.getCreatedAtDate() === dateSearch)
            if (this.isEmptyList(cardList)) return {success: true, message: "Card list is empty", data: cardList};
        }
        if (args.edited) {
            const dateSearch = new Date(args.edited);
            cardList = cardList.filter(card => card.getUpdateAtDate() === dateSearch)
            if (this.isEmptyList(cardList)) return {success: true, message: "Card list is empty", data: cardList};
        }
        if (args.createdAfter) {
            const dateSearch = new Date(args.createdAfter);
            cardList = cardList.filter(card => card.getCreatedAtDate() > dateSearch);
            if (this.isEmptyList(cardList)) return {success: true, message: "Card list is empty", data: cardList};
        }

        if (args.createdBefore) {
            const dateSearch = new Date(args.createdBefore);
            cardList = cardList.filter(card => card.getCreatedAtDate() < dateSearch);
            if (this.isEmptyList(cardList)) return {success: true, message: "Card list is empty", data: cardList};
        }
        return {success: true, message: "Cards listed", data: cardList};
    }

    private isEmptyList(list : Card[]) {
        return list.length === 0;
    }
}