import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IEditBoardCommand} from "../interfaces/CommandInterfaces.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {ExecReturn} from "../utils/Types.js";

class EditBoardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "update-card";
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
            .action((name: string, id: number, option: IEditBoardCommand) => {

            })
    }

    public exec(args: Record<string, string>): ExecReturn {
        return {success: true, message: "Board edited"}
    }
}