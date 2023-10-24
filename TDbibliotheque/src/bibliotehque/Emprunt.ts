import {Adherent} from "./Adherent";
import {Volume} from "./Volume";

export class Emprunt {

    constructor(private _adherent: Adherent, private _volume: Volume, private _dateEmprunt: Date) {
    }

    get adherent(): Adherent {
        return this._adherent;
    }

    get volume(): Volume {
        return this._volume;
    }

    get dateEmprunt(): Date {
        return this._dateEmprunt;
    }

    public description(): string {
        return `Emprunt de ${this._volume.description()} par ${this._adherent.nom} le ${this._dateEmprunt.toDateString()} `;
    }
}