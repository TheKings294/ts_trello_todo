import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IEditBoardCommand} from "../interfaces/CommandInterfaces.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {ExecReturn} from "../utils/Types.js";
import type {Board} from "../models/Board.js";

export class EditBoardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "update-board";
    }

    public getDescription(): string {
        return "Update the card";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<name>", "The name of the board")
            .option("-s, --status <value>", "The status list of the board",
                (value, previous: string[] = []) => {
                    return [...previous, value];
                })
            .option("-d, --description <desc>", "The description of the board")
            .option("-n, --name <name>", "The name of the board")
            .action((name: string, option: IEditBoardCommand) => {
                const data: Record<string, string | string[]> = {
                    name: name,
                }
                if (option.description) {
                    data.newDescription = option.description;
                }
                if (option.name) {
                    data.newName = option.name;
                }
                if (option.status) {
                    data.newStatus = option.status;
                }

                const result = this.exec(data)
                this.printResult(result)
            })
    }

    public exec(args: Record<string, string | string[]>): ExecReturn {
        const Board: undefined | Board = this.manager.findByName(args.name as string);

        if (!Board) {
            return {success: false, message: "Not board found at this name"};
        }

        if (args.newDescription) {
            Board.description = args.newDescription as string;
        }
        if (args.newName) {
            Board.odlName = Board.name;
            Board.name = args.newName as string;
        }
        if (args.newStatus) {
            args.newStatus = args.newStatus as string[];
            args.newStatus.forEach((value: string) => {
                if (Board.status.includes(value)) {
                    Board.status.splice(Board.status.indexOf(value), 1);
                } else {
                    Board.status.push(value);
                }
            })
        }
        Board.setUpdateAtDate(new Date(Date.now()));
        this.repo.save(Board);
        return {success: true, message: "Board edited"}
    }
}