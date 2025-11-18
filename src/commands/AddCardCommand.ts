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
            .argument("<name>", "Name to greet")
            .option('-d, --description <text>', 'descriptions')
            .action((name: string, option) => {
                const data: Record<string, string> = {
                    name: name,
                };
                if (option) {
                    data.description = option
                }

                const result: ExecReturn = this.exec(data)
                this.printResult(result)
            });
    }

    public exec(args: Record<string, string>): ExecReturn {
        if (Object.keys(args).length < 1) {
            return {success: false, message: "Invalid arguments"};
        }
        if (this.manager.getBoardList().length === 0) {
            return {success: false, message: "No boards in the list"};
        }
        const board: Board | boolean = this.manager.findByName(args["board-name"]);
        if (typeof board === "boolean") {
            return {success: false, message: "Board not found in the list"};
        }

        const cardDTO: CardDTO = {
            id: Card.generateId(),
            name: args.name as string,
            description: args.des,
            status: board.status.find(s => s === args.status) as string
        }

        const card: Card = new Card(cardDTO);
        board.card.addCard(card);
        this.repo.save(board)

        return {success: true, message: "Successfully created card"};
    }
}