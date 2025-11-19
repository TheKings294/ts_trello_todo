import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IDeleteCommand} from "../interfaces/CommandInterfaces.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {ExecReturn} from "../utils/Types.js";
import inquirer from "inquirer";
import type {Board} from "../models/Board.js";

export class DeleteBoardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
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
            .action(async (name: string, option: IDeleteCommand) => {
                let result = {success: true, message: "Deleting board"};
                if (!option.yes) {
                    const { confirm } = await inquirer.prompt([
                        {
                            type: "confirm",
                            name: "confirm",
                            message: `Are you sure to delete this board : ${name}`,
                            default: false
                        }
                    ])

                    if (!confirm) {
                        result.success = false;
                        result.message = "Command cancel";

                        this.printResult(result)
                        return;
                    }
                }

                const data: Record<string, string> = {
                    name: name,
                }

                result = this.exec(data);
                this.printResult(result);
            })

    }

    public exec(args: Record<string, string>): ExecReturn {
        const board: undefined | Board = this.manager.findByName(args.name);

        if (!board) {
            return {success: false, message: "No board find"};
        }

        this.manager.deleteBoard(board as Board);
        try {
            this.repo.delete(board);
        } catch (e) {
            if (e instanceof Error) {
                return {success: false, message: e.message};
            }
        }

        return {success: true, message: `Deleting board:`};
    }
}