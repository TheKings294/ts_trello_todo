import {AbstractRepository} from "./AbstractRepository.js";
import * as fs from "node:fs";

export class BoardRepository extends AbstractRepository {
    private path(board: string): string {
        return `./data/${board}.json`
    }

    public load(board: string): {} {
        if (!fs.existsSync(this.path(board))) return { card: [] };
        return JSON.parse(fs.readFileSync(this.path(board), 'utf8'));
    }

    public save(boardData: any) {
        const file = this.path(boardData.name);
        fs.writeFileSync(file, JSON.stringify(boardData, null, 2));
    }
}