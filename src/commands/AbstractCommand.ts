import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {Command} from "commander";
import type {AbstractManager} from "../manager/abstractManager.js";

export abstract class AbstractCommand {
    protected repo: AbstractRepository;
    protected manager: AbstractManager;

    constructor(repo: AbstractRepository, manager : AbstractManager) {
        this.repo = repo;
        this.manager = manager
    }

    abstract getName(): string;
    abstract getDescription(): string;
    abstract register(program: Command): void

    abstract exec(args : Record<string, string>): boolean;
}