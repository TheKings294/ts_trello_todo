import type {Board} from "../models/Board.js";
import type {AbstractManager} from "../manager/abstractManager.js";

export abstract class AbstractRepository {
    abstract load(): AbstractManager;

    abstract save(boardData: Board): void;
    abstract delete(boardData: Board): void;
}