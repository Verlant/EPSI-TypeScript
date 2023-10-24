import {Emprunt} from "./Emprunt";
import {Volume} from "./Volume";

export class Adherent {
    private _emprunts: Emprunt[] = [];

    constructor(private _id: number, private _nom: string, private _prenom: string) {
    }

    public description(): string {
        return `num=${this._id}-${this._nom.toUpperCase()} ${this._prenom}`;
    }

    get id(): number {
        return this._id;
    }

    get nom(): string {
        return this._nom;
    }

    get prenom(): string {
        return this._prenom;
    }

    public emprunte(volume: Volume): boolean {
        if (volume === null) {
            throw new Error("Adherent.emprunte, volume = null")
        }
        if (! volume.emprunter()) {
            return false;
        }

        this._emprunts.push(new Emprunt(this, volume, new Date()));
        return true;
    }

    public emprunte2(volume: Volume): Emprunt {
        if (volume === null) {
            throw new Error("Adherent.emprunte, volume = null")
        }
        if (! volume.emprunter()) {
            return null;
        }

        const emprunt = new Emprunt(this, volume, new Date());
        this._emprunts.push(emprunt);
        return emprunt;
    }

    public afficherEmprunts(): void {
        console.log("Liste des emprunts de l'adhérent " + this.description());
        this._emprunts.forEach(emprunt => {
           console.log(emprunt.description());
        });
    }

    rechercherEmpruntVolume(volume: Volume): Emprunt | undefined {
        if (volume === null) {
            throw new Error("Adherent.emprunte, volume = null")
        }
        return this._emprunts.find(value => value.volume.id === volume.id);
    }
}