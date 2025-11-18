import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {AbstractManager} from "../manager/abstractManager.js";
import type {Command} from "commander";
import type {CardManager} from "../manager/cardManager.js";
import type {ExecReturn} from "../utils/Types.js";

class ListCardCommand extends AbstractCommand<CardManager> {
    constructor(repo: AbstractRepository, manager: CardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "lits-card";
    }

    public getDescription(): string {
        return "List the card of an board";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .argument("<board-name>", "Board name, where the card is store")
            .option("-sc, --search <search>", "Search in card name an description")
            .option("-s, --status <status>", "Search card by status")
            .option("-c, --created <date>", "Search card by date of creation")
            .option("-e, --edited <date>", "Search card by date of edition")
            .option("-ca, --created-after <date>", "Search card by date of creation after x")
            .option("-cb, --created-before <date>", "Search card by date of creation before x")
            .action((): void => {

            })
    }

    public exec(args: Record<string, string>): ExecReturn {
        return {success: true, message: "Cards listed"}
    }
}