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
            .option("--search <search>", "Search in board name an description")
            .option("-c, --created <date>", "Search board by date of creation")
            .option("-e, --edited <date>", "Search board by date of edition")
            .option("--created-after <date>", "Search board by date of creation after x")
            .option("--created-before <date>", "Search board by date of creation before x")
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
                if (this.isExecReturnList(result)) {
                    this.printBoards(result.data as Board[]);
                }
            })
    }

    public exec(args: Record<string, string>): ExecReturn | ExecReturnList {
        let boardList: Board[] = this.manager.getBoardList();

        if (boardList.length === 0) {
            return {success: false, message: "Board list is empty"};
        }
        if (args.search) {
            args.search = args.search.toLowerCase();
            boardList = boardList.filter(board =>
                board.name.toLowerCase().includes(args.search as string) ||
                board.description?.toLowerCase().includes(args.search as string))

            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        if (args.created) {
            const dateSearch = new Date(args.created).setHours(0, 0, 0, 0);
            boardList = boardList.filter(board => board.getCreatedAtDate().setHours(0,0,0,0) === dateSearch)

            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        if (args.edited) {
            const dateSearch = new Date(args.edited).setHours(0, 0, 0, 0);
            boardList = boardList = boardList.filter(board => board.getUpdateAtDate().setHours(0,0,0,0) === dateSearch)
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        if (args.createdAfter) {
            const dateSearch = new Date(args.createdAfter);
            boardList = boardList = boardList.filter(board => board.getCreatedAtDate() > dateSearch);
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }

        if (args.createdBefore) {
            const dateSearch = new Date(args.createdBefore);
            boardList = boardList = boardList.filter(board => board.getCreatedAtDate() < dateSearch);
            if (this.isEmptyList(boardList)) return {success: true, message: "Board list is empty", data: boardList};
        }
        return {success: true, message: "Board listed", data: boardList};
    }

    private isEmptyList(list : Board[]) {
        return list.length === 0;
    }

    private printBoards(boards: Board[]) {
        if (boards.length === 0) {
            console.log("No boards to display.");
            return;
        }

        boards.forEach((board, index) => {
            console.log(`\nBoard #${index + 1}`);
            console.log("---------------");
            console.log(`Name       : ${board.name}`);
            console.log(`Description: ${board.description || ""}`);
            console.log(`Status     : ${board.status}`);
            console.log(`Created At : ${board.createdAt.toLocaleString()}`);
            console.log(`Updated At : ${board.updatedAt.toLocaleString()}`);
        });
    }
}