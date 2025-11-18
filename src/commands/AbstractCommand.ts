import type {AbstractRepository} from "../repositories/AbstractRepository.js";
import type {BoardManager} from "../manager/boardManager.js";
import type {Command} from "commander";
import type {AbstractManager} from "../manager/abstractManager.js";

export abstract class AbstractCommand<TManager extends AbstractManager> {
    protected repo: AbstractRepository;
    protected manager: TManager;

    constructor(repo: AbstractRepository, manager : TManager) {
        this.repo = repo;
        this.manager = manager
    }

    abstract getName(): string;
    abstract getDescription(): string;
    abstract register(program: Command): void

    abstract exec(args : Record<string, string>): object;

    public printResult(result: { success: boolean; message: string }) {
        if (result.success) {
            console.log("✔", result.message);
        } else {
            console.log("✖", result.message);
        }
    }
}