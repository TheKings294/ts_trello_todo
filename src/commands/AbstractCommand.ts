import type {AbstractRepository} from "../repositories/AbstractRepository.js";

export abstract class AbstractCommand {
    abstract exec(repo : AbstractRepository): string;
}