import {AbstractRepository} from "./AbstractRepository.js";
import * as fs from "node:fs";
import {BoardManager} from "../manager/boardManager.js";

export class BoardRepository extends AbstractRepository {
    private path(board: string): string {
        return `./data/${board}.json`
    }

    public load(): BoardManager {
        const manager = new BoardManager();
        //if (!fs.existsSync(this.path(board))) return { card: [] };
        //return JSON.parse(fs.readFileSync(this.path(board), 'utf8'));

        return manager
    }

    public save(boardData: any) {
        const file = this.path(boardData.name);
        fs.writeFileSync(file, JSON.stringify(boardData, null, 2));
    }
    public delete(boardData: any) {
        const file = this.path(boardData.name);
        fs.unlink(file, (error) => {
            if (error) throw error;
        });
    }
}