import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IDeleteCommand} from "../interfaces/CommandInterfaces.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {ExecReturn} from "../utils/Types.js";

class DeleteBoardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "delete-board";
    }

    public getDescription(): string {
        return "Delete an board";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<name>", "The name of the board")
            .option("-y, --yes", "To approuve de deleting board")
            .action((name: string, option: IDeleteCommand) => {

            })

    }

    public exec(args: Record<string, string>): ExecReturn {
        return {success: true, message: `Deleting board:`};
    }
}