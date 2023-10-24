
export abstract class Ouvrage {

   protected constructor (private _id: number, private  _titre: string, private _dateParution: Date) {
    }

    public description(): string {
       return `num=${this._id}-${this._titre} paru le ${this._dateParution.toDateString()}`;
    }

    get id(): number {
        return this._id;
    }

    get titre(): string {
        return this._titre;
    }

    get dateParution(): Date {
        return this._dateParution;
    }
}
