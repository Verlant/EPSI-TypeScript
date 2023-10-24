
import {Ouvrage} from './Ouvrage';

export class Volume extends Ouvrage {

    private _nombreExemplaireEmprunte = 0;

    constructor (
        id: number, titre: string, dateParution: Date,
        private _nombreExemplaire: number,
        private  _auteur: string
    ) {
        super(id, titre, dateParution);
        if (this._nombreExemplaire < 0) {
            throw new Error("Le nombre d'exemplaire doit être supérieur ou égal à 0");
        }
    }

    public description(): string {
        return `${super.description()} de ${this._auteur}, ${this._nombreExemplaireEmprunte} emprunté sur ${this._nombreExemplaire}`;
    }

    get nombreExemplaire(): number {
        return this._nombreExemplaire;
    }

    get nombreExemplaireEmprunte(): number {
        return this._nombreExemplaireEmprunte;
    }

    get auteur(): string {
        return this._auteur;
    }

    emprunter(): boolean {
        if (this._nombreExemplaireEmprunte < this._nombreExemplaire) {
            this._nombreExemplaireEmprunte++;
            return true;
        }

        return false;
    }
}