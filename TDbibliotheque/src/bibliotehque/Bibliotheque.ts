import {Ouvrage} from "./Ouvrage";
import {Adherent} from "./Adherent";
import {Volume} from "./Volume";
import {Observable, Subject} from "rxjs";
import {Emprunt} from "./Emprunt";

export class Bibliotheque {
    private _ouvrages: Ouvrage[] = [];
    private _adherents: Adherent[] = [];

    // Observable
    private _subjectEmprunt = new Subject<Emprunt>();
    empruntAnnonce$: Observable<Emprunt> = null;

    get ouvrages(): Ouvrage[] {
        return this._ouvrages;
    }

    get adherents(): Adherent[] {
        return this._adherents;
    }

    constructor() {
        this.empruntAnnonce$ = this._subjectEmprunt.asObservable();
    }

    public ajouterAdherent(adherent: Adherent): boolean {
        if (adherent === null) {
            throw new Error("Bibliotheque.ajouterAdherent - adherent is null");
        }
        if (this.rechercherAdherent(adherent.id)) {
            // On ne peut pas ajouter 2 fois le même adherent
            return false;
        }

        this._adherents.push(adherent);
        return true;
    }

    public rechercherAdherent(id: number): Adherent | undefined {
        return this._adherents.find(value => value.id === id);
    }

    public ajouterOuvrage(ouvrage: Ouvrage): boolean {
        if (ouvrage === null) {
            throw new Error("Bibliotheque.ajouterOuvrage - ouvrage is null");
        }
        if (this.rechercherOuvrage(ouvrage.id)) {
            // On ne peut pas ajouter 2 fois le même ouvrage
            return false;
        }

        this._ouvrages.push(ouvrage);
        return true;
    }

    public rechercherOuvrage(id: number): Ouvrage | undefined {
        return this._ouvrages.find(value => value.id === id);
    }
    public rechercheOuvrageParTitre(titre: string): Ouvrage[] {
        return this._ouvrages.filter(value => value.titre.includes(titre));
    }

    public supprimerOuvrage(id: number): boolean {
        const index = this._ouvrages.findIndex(value => value.id === id);
        if (index < 0) {
            return false;
        }

        this._ouvrages.splice(index);
        return true;
    }

    public emprunte(adherent: Adherent, ouvrage: Volume): boolean {
        if (adherent === null) {
            throw new Error("Bibliotheque.emprunte, adherent = null")
        }

        // return adherent.emprunte(ouvrage);
        // Observable
        const emprunt = adherent.emprunte2(ouvrage);
        if(emprunt === null) {
            return false;
        }

        this._subjectEmprunt.next(emprunt);
        return true;
    }

    afficherEmprunts(): void {
        for (let adherent of this._adherents)
        {
            console.log(`*** Adhérent: ${adherent.description()} + ' a emprunté:`);
            adherent.afficherEmprunts();
        }
    }

    afficherEmpruntsAdherent(adherent: Adherent): void {
        if (adherent === null) {
            throw new Error("Bibliotheque.afficherEmpruntsAdherent - adherent is null");
        }
        const adherentRecherche: Adherent = this.rechercherAdherent(adherent.id);
        if (adherentRecherche === undefined) {
            console.log(`L'adhérent ${adherent.description()} n'a pas été trouvé dans la liste`);
        }
        adherentRecherche.afficherEmprunts();
    }

    afficherEmprunteursOuvrage(id: number): void {
        const ouvrageRecherche: Ouvrage = this.rechercherOuvrage(id);
        if (ouvrageRecherche === undefined) {
            console.log(`Le ouvrage num=${id} n'a pas été trouvé dans la liste`);
            return;
        }

        console.log(`Listes des emprunteurs du ouvrage : ${ouvrageRecherche.description()}`);
        for (let adherent of this._adherents)
        {
            if (adherent.rechercherEmpruntVolume(ouvrageRecherche as Volume) !== undefined) {
                console.log('-- ' + adherent.description());
            }
        }
    }
}
