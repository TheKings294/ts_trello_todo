import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Board} from "../models/Board.js";
import {BoardManager} from "../manager/boardManager.js";
import {Card} from "../models/Card.js";
import type {CardDTO} from "../utils/Types.js";
import type {Command} from "commander";
import type {AbstractManager} from "../manager/abstractManager.js";


export class AddCardCommand extends AbstractCommand {
    constructor(repo: AbstractRepository, manager: AbstractManager) {
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
                console.log(option);
                this.exec(data)
            });
    }

    public exec(args: Record<string, string>): boolean {
        /*if (Object.keys(args).length < 5) {
            throw new Error("Invalid argument");
        }
        const board: Board | boolean = this.manager.findByName(args["board-name"]);
        if (typeof board === "boolean") {
            throw new Error("Board not found !");
        }

        const cardDTO: CardDTO = {
            id: Card.generateId(),
            name: args.name as string,
            description: args.des,
            status: board.status.find(s => s === args.status) as string
        }

        const card: Card = new Card(cardDTO);
        board.card.addCard(card);
        this.repo.save(board)*/

        console.log(args)
        return true
    }
}