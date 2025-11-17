import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {AbstractManager} from "../manager/abstractManager.js";
import type {Command} from "commander";
import type {IDeleteCommand} from "../interfaces/CommandInterfaces.js";

class DeleteBoardCommand extends AbstractCommand {
    constructor(repo: AbstractRepository, manager: AbstractManager) {
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

    public exec(args: Record<string, string>): boolean {
        return true
    }
}