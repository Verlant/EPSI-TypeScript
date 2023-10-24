import {Volume} from "./Volume";


export class BandeDessinee extends Volume {

    constructor (
        id: number, titre: string, dateParution: Date,
        nombreExemplaire: number,
        auteur: string,
        private _scenariste: string
    ) {
        super(id, titre, dateParution, nombreExemplaire, auteur);
    }

    public description(): string {
        return `BD: ${super.description()}, scénariste: ${this._scenariste}`;
    }

    get scenariste(): string {
        return this._scenariste;
    }
}