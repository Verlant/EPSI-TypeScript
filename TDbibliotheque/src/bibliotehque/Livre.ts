import {Volume} from "./Volume";

export class Livre extends Volume {

    constructor (
        id: number, titre: string, dateParution: Date,
        nombreExemplaire: number,
        auteur: string,
        private _isbn: string
    ) {
        super(id, titre, dateParution, nombreExemplaire, auteur);
    }

    public description(): string {
        return `LIVRE: ${this._isbn}-${super.description()}`;
    }

    get isbn(): string {
        return this._isbn;
    }
}