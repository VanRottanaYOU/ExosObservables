import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { map, flatMap, min } from 'rxjs/operators';
import { GithubUser } from '../interfaces/GitHubUsers';
import { Produit } from 'src/app/models/Produit';
import { ProduitsEnVente } from 'src/app/models/ProduitsEnVente';
import { Observable } from 'rxjs';

const url1 = "http://127.0.0.1:3000/produitsEnVente/1";
const url2 = "http://127.0.0.1:3000/produits";

@Component({
  selector: 'app-test-flat-map',
  templateUrl: './test-flat-map.component.html',
  styleUrls: ['./test-flat-map.component.css']
})
export class TestFlatMapComponent implements OnInit {

  dataA: ProduitsEnVente;
  dataB: Array<any> = [];
  dataC: Array<any> = [];

  produits1 : Observable<ProduitsEnVente[]>;
  produit3 : Observable<Produit[]>;
  produit4 : Observable<Produit[]>;
  produit5 : Produit[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // {
    //   this.http.get(url1)
    //     .pipe(
    //       map((produitsEnVente: ProduitsEnVente) => {
    //         console.log(produitsEnVente)
    //         return produitsEnVente
    //       }),
    //       flatMap((produitsEnVente: ProduitsEnVente) => {
    //         let params = new HttpParams().set('libelle', produitsEnVente.libelle);
    //         return this.http.get("http://127.0.0.1:3000/produits", { params })
    //           .pipe(map((result: any) => {
    //             console.log(result)
    //             return result;
    //           }))
    //       }));
    // }


    // {
    //   return this.http.get("http://127.0.0.1:3000/produitsEnVente")
    //     .pipe(
    //       map(
    //         (produits: ProduitsEnVente[]) => produits.filter(
    //           (produits: ProduitsEnVente) => {
    //             produits.libelle === "coca"
    //             return produits
    //           })
    //       )
    //     )
    // }

    //this.search1();
    this.produits1=this.search2("Coca");
    this.produit3=this.search3("2019-09-25");
    this.produit4=this.search4("Coca");
    //this.produit5=this.search5("Coca");
    this.search5("Coca");
    //this.miseajour("Coca")
    //this.produit5=this.search5("Coca");
  }

  search1(): Observable<ProduitsEnVente[]> {
    let apiURL = "http://127.0.0.1:3000/produitsEnVente";
    return this.produits1 = this.http.get<ProduitsEnVente[]>(apiURL)
  }

  search2(libelle : string) : Observable<ProduitsEnVente[]>{
    let params = new HttpParams().set('libelle', libelle);
    let apiURL = "http://127.0.0.1:3000/produitsEnVente";
      return this.http.get<ProduitsEnVente[]>(`${apiURL}`, { params })      
  }

  search3(date : string) : Observable<Produit[]>{
      let params = new HttpParams().set('dateLimite', date);
      let apiURL = "http://127.0.0.1:3000/produits";
        return this.http.get<Produit[]>(`${apiURL}`, { params })      
  }

  search4(libelle : string) : Observable<Produit[]>{
    let params = new HttpParams().set('libelle', libelle);
    let apiURL = "http://127.0.0.1:3000/produits";
      return this.http.get<Produit[]>(`${apiURL}`, { params })    
  }

  search5(libelle : string) {
    this.search4(libelle)
    .pipe(map(items => items.sort(this.comparer))
    )
    .subscribe(
      (articles: Produit[]) => {
        this.produit5 = articles;
        this.ngOnInit();
      }
    );
  }

  miseajourproduit(produit : Produit){
    produit.quantiteRestante = 30;
    console.log("mise a jour : "+produit.id+" "+produit.libelle+" "+produit.quantiteRestante)
    let apiURL = "http://127.0.0.1:3000/produits";
    const url = `${apiURL}/${produit.id}`;
    this.http.put(url, produit)
    .subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        console.log("Modification de l'utilisateur", error);
      }
    );
  }


  comparer(produit1: Produit , produit2: Produit) {
    if (produit1.dateLimite < produit2.dateLimite)
      return -1;
    if (produit1.dateLimite > produit2.dateLimite)
      return 1;
    return 0;
  }

  // miseajour(libelle : string){
  //   let listproduit: Observable<Produit[]> =this.search5(libelle);

  //   listproduit.forEach(
  //     (produits: Produit[]) => {
  //       let that = this;
  //       produits.forEach(
  //         (produit: Produit) => {
  //           console.log(produit.id+" "+produit.libelle+" "+produit.quantiteRestante)
  //          if(produit.quantiteRestante >= 30){
  //             this. miseajourproduit(produit)
  //             console.log(produit.id+" "+produit.libelle+" "+produit.quantiteRestante)
  //          }
  //         }
  //       )
  //     }
  //   );
  // }

}
