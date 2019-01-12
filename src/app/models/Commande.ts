export class Commande {
    id: number;
    libelle: string;
    dateAchat: string;
    prixAchat: number;
    listeProduits : string[];

    constructor (libelle, dateAchat, prixAchat, listeProduits){
        this.libelle=libelle;
        this.dateAchat=dateAchat;
        this.prixAchat=prixAchat;
        this.listeProduits = listeProduits;
    }
    
}
