export class ProduitsEnVente {
    id: number;
    libelle: string;
    categorie: string;
    prixvente: number;

    constructor (libelle, categorie, prixvente){
        this.libelle=libelle;
        this.categorie=categorie;
        this.prixvente=prixvente;
    }

}