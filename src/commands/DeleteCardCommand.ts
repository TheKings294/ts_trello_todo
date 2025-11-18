import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {Command} from "commander";
import type {IDeleteCommand} from "../interfaces/CommandInterfaces.js";
import type {ExecReturn} from "../utils/Types.js";
import inquirer from "inquirer";
import type {Board} from "../models/Board.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {CardManager} from "../manager/cardManager.js";
import type {Card} from "../models/Card.js";

class DeleteCardCommand extends AbstractCommand<BoardManager> {
    constructor(repo: AbstractRepository, manager: BoardManager) {
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
            .action(async (name: string, id: string, option: IDeleteCommand) => {
                let result = {success: true, message: "Card deleted"};
                if (!option.yes) {
                    const {confirm} = await inquirer.prompt([
                        {
                            type: "confirm",
                            name: "confirm",
                            message: `Are you sure to delete this card : ${id}`,
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
                    nameBoard: name,
                    idCard: id
                }

                result = this.exec(data)
                this.printResult(result)
            })
    }

    public exec(args: Record<string, string>): ExecReturn {
        const board: undefined | Board = this.manager.findByName(args.name)

        if (!board) {
            return {success: false, message: "No board find"};
        }

        const cardManager: CardManager = board.getCardManager();
        const card: Card | undefined = cardManager.findByName(args.idCard as string);
        if (!card) {
            return {success: false, message: "No card found"};
        }
        cardManager.deleteCard(card)

        return {success: true, message: "Deleting a card"};
    }
}