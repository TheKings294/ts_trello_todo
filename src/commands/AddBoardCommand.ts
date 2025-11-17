import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {AbstractManager} from "../manager/abstractManager.js";
import type {Command} from "commander";
import type {IAddBoardCommand} from "../interfaces/CommandInterfaces.js";

class AddBoardCommand extends AbstractCommand {
    constructor(repo: AbstractRepository, manager: AbstractManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "create-board";
    }

    public getDescription(): string {
        return "With this command, you can create an board in your todo app";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<name>", "Board name")
            .argument("<state...>", "Board state list")
            .option("-d, --description <text>", "Board description")
            .action((name: string, state: string[], option: IAddBoardCommand) => {

            })
    }

    public exec(args: Record<string, string>): boolean {
        return true
    }
}