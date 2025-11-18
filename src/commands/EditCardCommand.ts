import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IEditCardCommand} from "../interfaces/CommandInterfaces.js";
import type {CardManager} from "../manager/cardManager.js";
import type {ExecReturn} from "../utils/Types.js";

class EditCardCommand extends AbstractCommand<CardManager> {
    constructor(repo: AbstractRepository, manager: CardManager) {
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
            .action((name: string, id: number, option: IEditCardCommand) => {

            })
    }

    public exec(args: Record<string, string>): ExecReturn {
        return {success: true, message: "Card edit"}
    }
}