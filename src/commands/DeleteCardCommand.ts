import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IDeleteCommand} from "../interfaces/CommandInterfaces.js";
import type {CardManager} from "../manager/cardManager.js";
import type {ExecReturn} from "../utils/Types.js";

class DeleteCardCommand extends AbstractCommand<CardManager> {
    constructor(repo: AbstractRepository, manager: CardManager) {
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

    public exec(args: Record<string, string>): ExecReturn {
        return {success: true, message: "Deleting a card"};
    }
}