import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map,delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http:HttpClient) { 
  }

  url = "https://first-crud-angular.firebaseio.com"

  borrarHeroe(id:string)
  {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id:string)
  {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  crearHeroe (heroe:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,heroe).pipe(map((resp:any)=>{
      heroe.id = resp.name;
      return heroe;
    }));
  }

  actualizarHeroe (heroe:HeroeModel){
    const heroeTemp = {...heroe};
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp).pipe(map((resp:any)=>{
      heroe.id = resp.name;
      return heroe;
    }));
  }

  getHeroes()
  {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      
      map((resp:any)=>{return this.crearArreglo(resp)}),delay(1000)
    
    );
  }

  private crearArreglo(heroesObj:Object)
  {
    const heroes:HeroeModel[] = [];
    if(heroesObj===null)
    {
      return [];
    }
    Object.keys(heroesObj).forEach(key=>{
      let heroe:HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

}
