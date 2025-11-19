#!/usr/bin/env node

import {AddCardCommand} from "./commands/AddCardCommand.js";
import {AddBoardCommand} from "./commands/AddBoardCommand.js";
import {DeleteBoardCommand} from "./commands/DeleteBoardCommand.js";
import {DeleteCardCommand} from "./commands/DeleteCardCommand.js";
import {EditBoardCommand} from "./commands/EditBoardCommand.js";
import {EditCardCommand} from "./commands/EditCardCommand.js";
import {ListBoardCommand} from "./commands/ListBoardCommand.js";
import {ListCardCommand} from "./commands/ListCardCommand.js";
import {BoardRepository} from "./repositories/BoardRepository.js";
import {BoardManager} from "./manager/boardManager.js";
import {Command} from "commander";
import type {AbstractCommand} from "./commands/AbstractCommand.js";

const program: Command = new Command();

program
    .name("todo")
    .description("Task manager CLI")
    .version("1.0.0")

const boardRepository = new BoardRepository()
const manager: BoardManager = await boardRepository.load()

const commandList: AbstractCommand<any>[] = [
    new AddCardCommand(boardRepository, manager),
    new AddBoardCommand(boardRepository, manager),
    new DeleteBoardCommand(boardRepository, manager),
    new DeleteCardCommand(boardRepository, manager),
    new EditBoardCommand(boardRepository, manager),
    new EditCardCommand(boardRepository, manager),
    new ListBoardCommand(boardRepository, manager),
    new ListCardCommand(boardRepository, manager),
]

commandList.forEach((command: AbstractCommand<any>) => {
    command.register(program);
})

program.parse(process.argv);