import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {BoardManager} from "../manager/boardManager.js";
import type {ExecReturn} from "../utils/Types.js";

class ListBoardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "list-board";
    }

    public getDescription(): string {
        return "List the board";
    }

    public register(program: Command) {
        program
            .command(this.getName())
            .description(this.getDescription())
            .option("-sc, --search <search>", "Search in board name an description")
            .option("-c, --created <date>", "Search board by date of creation")
            .option("-e, --edited <date>", "Search board by date of edition")
            .option("-ca, --created-after <date>", "Search board by date of creation after x")
            .option("-cb, --created-before <date>", "Search board by date of creation before x")
            .action((): void => {

            })
    }

    public exec(args: Record<string, string>): ExecReturn {
        return {success: true, message: "Board listed"};
    }
}