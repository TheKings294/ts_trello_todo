import { describe, it, expect, vi, beforeEach } from "vitest";
import {BoardManager} from "../src/manager/boardManager.js";
import {CardManager} from "../src/manager/cardManager.js";
import {Card} from "../src/models/Card.js";
import {Board} from "../src/models/Board.js";

describe("Manager", () => {
    let boardManager: BoardManager;
    let cardManager: CardManager;
    let card: Card;
    let board: Board;

    beforeEach(() => {
        boardManager = new BoardManager();
        cardManager = new CardManager();

        card = new Card({
            id: "1",
            name: "Card1",
            description: "Desc",
            status: "todo"
        })

        board = new Board({
            name: "TestBoard",
            description: "A test",
            status: ["todo", "done"],
            card: []
        });
    })

    it ('Should be add an board', () => {
        const before = [...boardManager.getBoardList()]
        boardManager.addBoard(board)
        const after = boardManager.getBoardList()

        expect(after.length).toBeGreaterThan(before.length);
    })

    it ('Should be delete an baord', () => {
        boardManager.addBoard(board)
        const before = [...boardManager.getBoardList()]
        boardManager.deleteBoard(board)
        const after = boardManager.getBoardList()

        expect(before.length).toBeGreaterThan(after.length);
    })

    it ('Should be find the board', () => {
        boardManager.addBoard(board)

        const boardFinding: Board = boardManager.findByName("TestBoard")

        expect(boardFinding).toBeInstanceOf(Board);
        expect(board.description === boardFinding.description).toBe(true)
    })

    it ('Should be find the board', () => {
        boardManager.addBoard(board)

        const boardFinding: Board | undefined = boardManager.findByName("qsdqsd")

        expect(typeof boardFinding).toBe("undefined")
    })

    // Card
    it ('Should be add an card', () => {
        const before = [...cardManager.getCardList()]
        cardManager.addCard(card)
        const after = cardManager.getCardList()

        expect(after.length).toBeGreaterThan(before.length);
    })

    it ('Should be delete an card', () => {
        cardManager.addCard(card)
        const before = [...cardManager.getCardList()]
        cardManager.deleteCard(card)
        const after = cardManager.getCardList()

        expect(before.length).toBeGreaterThan(after.length);
    })

    it ('Should be find the card', () => {
        cardManager.addCard(card)

        const cardFinding: Card = cardManager.findByName("1")

        expect(cardFinding).toBeInstanceOf(Card);
        expect(card.description === cardFinding.description).toBe(true)
    })

    it ('Should be find the card', () => {
        cardManager.addCard(card)

        const cardFinding: Board | undefined = cardManager.findByName("10")

        expect(typeof cardFinding).toBe("undefined")
    })
})