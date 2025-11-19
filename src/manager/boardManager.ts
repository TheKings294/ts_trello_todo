import type {Board} from "../models/Board.js";

export class BoardManager {
    private board: Board[] = [];

    public addBoard(board: Board): void {
        this.board.push(board);
    }

    public findByName(name: string | undefined): Board | undefined {
        return this.board.find(b => b.name === name)
    }

    public getBoardList(): Board[] {
        return this.board;
    }

    public deleteBoard(board: Board): void {
        this.board.splice(this.board.indexOf(board), 1);
    }
}