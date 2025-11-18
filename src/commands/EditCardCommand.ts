import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IEditCardCommand} from "../interfaces/CommandInterfaces.js";
import type {ExecReturn} from "../utils/Types.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {Board} from "../models/Board.js";
import type {Card} from "../models/Card.js";

class EditCardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "update-card";
    }

    public getDescription(): string {
        return "Update an card";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<name>", "The name of the board")
            .argument("<id>", "The id of the card")
            .option("-s, --status <status>", "The status of the card")
            .option("-d, --description <desc>", "The description of the card")
            .option("-n, --name <name>", "The name of the card")
            .action((name: string, id: string, option: IEditCardCommand) => {
                const data: Record<string, string> = {
                    boardName: name,
                    id: id,
                }
                if (option.status) {
                    data.newStatus = option.status;
                }
                if (option.description) {
                    data.newDescription = option.description;
                }
                if (option.name) {
                    data.newName = option.name;
                }

                const result = this.exec(data)
                this.printResult(result)
            })
    }

    public exec(args: Record<string, string>): ExecReturn {
        const board: undefined | Board = this.manager.findByName(args.boardName);
        if (!board) {
            return {success: false, message: "Board not found"};
        }
        const card: Card | undefined = board.getCardManager().findByName(args.id as string);
        if (!card) {
            return {success: false, message: "Card not found"};
        }
        if (args.newStatus) {
            if (!board.status.includes(args.newStatus)) {
                return {success: false, message: "Status not found in the board list"};
            }
            card.status = args.newStatus;
        }
        if (args.newDescription) {
            card.description = args.newDescription;
        }
        if (args.newName) {
            card.name = args.newName;
        }
        this.repo.save(board)
        return {success: true, message: "Card edit"}
    }
}