import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {AbstractManager} from "../manager/abstractManager.js";
import type {Command} from "commander";
import type {IDeleteCommand} from "../interfaces/CommandInterfaces.js";

class DeleteCardCommand extends AbstractCommand {
    constructor(repo: AbstractRepository, manager: AbstractManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "delete-card";
    }

    public getDescription(): string {
        return "Deleting a card";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<name>", "The board name")
            .argument("<id>", "The card ID")
            .option("-y, --yes", "Approuve the deleting os the card")
            .action((name: string, id: number, option: IDeleteCommand) => {

            })
    }

    public exec(args: Record<string, string>): boolean {
        return true
    }
}