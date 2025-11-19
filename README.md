# Todo Board CLI

[![npm version](https://img.shields.io/npm/v/todo-board-cli.svg)](https://www.npmjs.com/package/ts_board_todo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful command-line interface tool for managing your tasks using boards and cards. Organize your todos with a Kanban-style workflow directly from your terminal.

## Description

Todo Board CLI is a flexible task management tool that helps you organize your work using a board and card system. Create multiple boards for different projects, add cards (tasks) to each board, and manage your workflow efficiently without leaving your terminal.

**Key Features:**
- Create and manage multiple boards
- Add, update, and delete cards (tasks)
- Move cards between different states (todo, in-progress, done)
- Filter and search cards

## Installation

### Global Installation (Recommended)

```bash
npm install -g ts_board_todo
```

### Local Installation

```bash
npm install ts_board_todo
```

### From Source

```bash
git clone https://github.com/TheKings294/ts_trello_todo.git
cd ts_trello_todo
npm install
```

## Usage Examples

### Create a New Board

```bash
todo create-board "Personal Projects" todo inPorgress
todo create-board "Work Tasks" todo inPorgress -d "This an description"
```

### List All Boards

```bash
todo list-board
```

### Add Cards to a Board

```bash
todo create-card "Personal Projects" "Learn Node.js" todo
todo create-card "Work Tasks" "Fix login bug" inProgres
todo create-card "Personal Projects" "Build portfolio website" state -d "An description"
```

### List Cards in a Board

```bash
# List all cards
todo list-card "Personal Projects"

# List cards by status
todo list-card "Work Tasks" --s todo
todo list-card "Work Tasks" --status done
```

### Update a Card

```bash
todo update-card "Personal Projects" "uuid" --status done
todo update-card "Work Tasks" "uuid" --name "Fix authentication bug"
```

### Move a Card

```bash
todo update-card "Personal Projects" "uuid" --status in-progress
```

### Delete a Card

```bash
todo delete-card "Personal Projects" "uuid"
todo delete-card "Personal Projects" "uuid" -y
```

### Delete a Board

```bash
todo delete-board "Personal Projects"
todo delete-board "Personal Projects" -y
```

### Board Commands

| Command                    | Description |
|----------------------------|-------------|
| `todo create-board <name>` | Create a new board |
| `todo list-board`          | List all boards |
| `todo delete-board <name>` | Delete a board |

### Card Commands

| Command                        | Description |
|--------------------------------|-------------|
| `todo add-card <board> <name>` | Add a new card to a board |
| `todo list-card <board>`       | List all cards in a board |
| `todo update-card <board> <id>` | Update a card |
| `todo delete-card <board> <id>` | Delete a card |

### Global Options

- `-h, --help`: Display help information
- `-V, --version`: Display version number

## Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/TheKings294/ts_trello_todo.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `npm test`
6. Commit your changes: `git commit -m "Add some feature"`
7. Push to the branch: `git push origin feature/your-feature-name`
8. Open a Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test-coverage

# Build the project
npm run build
```

### Code Standards

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

### Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub with:
- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Your environment details (OS, Node version, etc.)

## License

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Made with ❤️ by [TheKings294]

[Report a Bug](https://github.com/TheKings294/ts_trello_todo/issues) | [Request a Feature](https://github.com/TheKings294/ts_trello_todo/issues)