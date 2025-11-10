import {AbstractCommand} from "./AbstractCommand.js";
import type {AbstractRepository} from "../repositories/AbstractRepository.js";

export class AddCardCommand extends AbstractCommand{
    public args : Record<string, string>;

    constructor(args : Record<string, string>) {
        super();
        this.args = args;
    }

    public exec(repo: AbstractRepository): string {
        return "Card Created"
    }
}