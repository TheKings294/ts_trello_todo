import { describe, it, expect, vi, beforeEach } from "vitest";
import { BoardManager } from "../src/manager/boardManager.js";
import fs from "fs/promises";
import * as fsSync from "fs";

vi.mock("fs/promises");
vi.mock("fs");

import {BoardRepository} from "../src/repositories/BoardRepository.js";
import {Board} from "../src/models/Board.js";
import {Card} from "../src/models/Card.js";

describe("board repository", () => {
    let repository: BoardRepository;
    let board: Board;

    beforeEach(() => {
        repository = new BoardRepository();

        board = new Board({
            name: "TestBoard",
            description: "A test board",
            status: ["todo", "done"],
            card: [
                    new Card({
                        id: "1",
                        name: "Card1",
                        description: "Card desc",
                        status: "todo",
                    })
            ]
        });
        board.odlName = "";
    })

    it("should return empty manager if ./data does not exist", async () => {

        vi.spyOn(fsSync, "existsSync").mockReturnValue(false);

        const manager = await repository.load();
        expect(manager.getBoardList().length).toBe(0);
    })

    it("should load boards from files", async () => {
        vi.spyOn(fsSync, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readdir").mockResolvedValue(["board1.json"] as any);

        const boardJson = {
            name: "Test Board",
            description: "Description",
            status: "todo",
            createAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
            cards: [
                {
                    id: "1",
                    name: "Card 1",
                    description: "Card desc",
                    status: "todo",
                    createAt: new Date().toISOString(),
                    updateAt: new Date().toISOString()
                }
            ]
        };

        vi.spyOn(fs, "readFile").mockReturnValue(JSON.stringify(boardJson));

        const manager: BoardManager = await repository.load();
        const boards = manager.getBoardList();
        expect(boards.length).toBe(1);
        expect(boards[0].name).toBe("Test Board");

        const cards = boards[0].getCardManager().getCardList();
        expect(cards.length).toBe(1);
        expect(cards[0].name).toBe("Card 1");
    })

    it('should write correct JSON to file', async () => {
        const writeFileSpy = vi.spyOn(fsSync, "writeFileSync").mockImplementation(() => {});

        await repository.save(board);

        expect(writeFileSpy).toHaveBeenCalledTimes(1);

        const callArgs = writeFileSpy.mock.calls[0];

        const jsonWritten = JSON.parse(callArgs[1]);
        expect(jsonWritten.name).toBe(board.name);
        expect(jsonWritten.description).toBe(board.description);
        expect(jsonWritten.cards.length).toBe(1);
        expect(jsonWritten.cards[0].name).toBe("Card1");

        writeFileSpy.mockRestore();
    })
})