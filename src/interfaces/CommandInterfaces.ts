export interface IAddBoardCommand {
    description?: string;
}

export interface IDeleteCommand {
    yes?: boolean | undefined;
}

export interface IEditCardCommand {
    status?: string;
    description?: string;
    name?: string;
}

export interface IEditBoardCommand {
    status?: string[];
    description?: string;
    name?: string;
}