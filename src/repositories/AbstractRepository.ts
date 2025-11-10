import fs from "node:fs";

export abstract class AbstractRepository {
    abstract load(board: string): {};

    abstract save(boardData: any): void;
}