#!/usr/bin/env node

import {AddCardCommand} from "./commands/AddCardCommand.js";
import {BoardRepository} from "./repositories/BoardRepository.js";
import {BoardManager} from "./manager/boardManager.js";
import {Command} from "commander";

const program: Command = new Command();

program
    .name("todo")
    .description("Task manager CLI")
    .version("1.0.0")

const manager = new BoardManager()
const boardRepository = new BoardRepository()

const new_command : AddCardCommand = new AddCardCommand(boardRepository, manager);
new_command.register(program);

program.parse(process.argv);