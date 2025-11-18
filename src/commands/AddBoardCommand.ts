import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {BoardManager} from "../manager/boardManager.js";
import type {BoardDTO, ExecReturn} from "../utils/Types.js";
import {Board} from "../models/Board.js";

class AddBoardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
        super(repo, manager);
    }

    public getName(): string {
        return "new-board";
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
            .action((name: string, state: string[], option) => {
                const data: Record<string, string | string[]> = {
                    name: name,
                    state: state,
                }
                if (option) {
                    data.description = option
                }
                const result = this.exec(data)
                this.printResult(result)
            })
    }

    public exec(args: Record<string, string | string[]>): ExecReturn {
        const boardDTO: BoardDTO = {
            name: args.name as string,
            description: args.description as string,
            status: args.state as string[],
            card: []
        };
        const board = new Board(boardDTO);
        this.manager.addBoard(board);
        this.repo.save(board);

        return {success: true, message: "Add board"}
    }
}