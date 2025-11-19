import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Board} from "../models/Board.js";
import {Card} from "../models/Card.js";
import type {CardDTO, ExecReturn} from "../utils/Types.js";
import type {Command} from "commander";
import type {BoardManager} from "../manager/boardManager.js";


export class AddCardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "new-card";
    }

    public getDescription(): string {
        return "Create an new card in an Board";
    }

    public register(program: Command): void {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<board-name>", "Name of the board")
            .argument("<name>", "Card name")
            .argument("<status>", "Status card")
            .option('-d, --description <text>', 'descriptions')
            .action((boardName: string, name: string, status: string, option) => {
                const data: Record<string, string> = {
                    boardName: boardName,
                    name: name,
                    status: status,
                };
                if (option) {
                    data.description = option
                }

                const result: ExecReturn = this.exec(data)
                this.printResult(result)
            });
    }

    public exec(args: Record<string, string>): ExecReturn {
        if (this.manager.getBoardList().length === 0) {
            return {success: false, message: "No boards in the list"};
        }
        const board: Board | undefined = this.manager.findByName(args.boardName);
        if (!board) {
            return {success: false, message: "Board not found in the list"};
        }

        const statusCard = board.status.find(s => s === args.status);
        if (typeof statusCard === "undefined") {
            return {success: false, message: "No status cards in the list"};
        }

        const cardDTO: CardDTO = {
            id: Card.generateId(),
            name: args.name as string,
            description: args.description,
            status: statusCard as string
        }

        const card: Card = new Card(cardDTO);
        board.card.addCard(card);
        this.repo.save(board)

        return {success: true, message: "Successfully created card"};
    }
}