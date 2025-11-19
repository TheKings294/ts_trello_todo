import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {BoardManager} from "../manager/boardManager.js";
import type {ExecReturn, ExecReturnList} from "../utils/Types.js";
import type {Board} from "../models/Board.js";

export class ListBoardCommand extends AbstractCommand<BoardManager> {
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
            .action((option): void => {
                const data: Record<string, string> = {}
                const fields = ["search", "created", "edited", "createdAfter", "createdBefore"] as const;
                for (const key of fields) {
                    if (option[key] !== undefined) {
                        (data as any)[key] = option[key];
                    }
                }

                const result = this.exec(data)
                this.printResult(result)
            })
    }

    public exec(args: Record<string, string>): ExecReturn | ExecReturnList {
        let boardList: Board[] = this.manager.getBoardList();

        if (boardList.length === 0) {
            return {success: false, message: "Board list is empty"};
        }
        if (args.search) {
            boardList = boardList.filter(board =>
                board.name.includes(args.search as string) ||
                board.description?.includes(args.search as string))

            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        if (args.created) {
            const dateSearch = new Date(args.created);
            boardList.filter(board => board.getCreatedAtDate() === dateSearch)
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        if (args.edited) {
            const dateSearch = new Date(args.edited);
            boardList = boardList.filter(board => board.getUpdateAtDate() === dateSearch)
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        if (args.createdAfter) {
            const dateSearch = new Date(args.createdAfter);
            boardList = boardList.filter(board => board.getCreatedAtDate() > dateSearch);
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }

        if (args.createdBefore) {
            const dateSearch = new Date(args.createdBefore);
            boardList = boardList.filter(board => board.getCreatedAtDate() < dateSearch);
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        return {success: true, message: "Board listed", data: boardList};
    }

    private isEmptyList(list : Board[]) {
        return list.length === 0;
    }
}