import type {Board} from "../models/Board.js";

export class BoardManager {
    private board: Board[] = [];

    public addBoard(board: Board): void {
        this.board.push(board);
    }

    public findByName(name: string | undefined): Board | boolean {
        if (typeof name !== "string") return false;
        return this.board.find(b => b.name === name) || false
    }
    public getBoardList(): Board[] {
        return this.board;
    }
}