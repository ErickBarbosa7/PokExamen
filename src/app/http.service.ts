import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './interface/pokemon.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLaravelService {
  private _url = 'http://127.0.0.1:8000/api';
  //https://pokeapi.co/api/v2/pokemon/1
  constructor(private http: HttpClient) { 
    
  }
  
  Service_Get(Modelo: string, Dato: string | number): Observable<Pokemon[]> {

    return this.http.get<Pokemon[]>(`${this._url}/${Modelo}/${Dato}`);
  }
  Service_Post(Modelo: string, Dato: string | number, Parametros: any ){
    return this.http.post(`${this._url}/${Modelo}/${Dato}`, Parametros);
  }
  Service_Patch(Modelo: string, Dato: string | number, Parametros: any ){
    const url = `${this._url}/${Modelo}/${Dato}`;
    console.log(`URL de la solicitud PATCH: ${url}`);  
    return this.http.patch(`${this._url}/${Modelo}/${Dato}`, Parametros);
  }
  Service_Delete(Modelo: string, Dato: string | number){
    return this.http.delete(`${this._url}/${Modelo}/${Dato}`);
  }
  Service_Get_Pagina(Modelo: string, Dato: string | number, page: number, rows: number){
    return this.http.get(`${this._url}/${Modelo}/${Dato}?page=${page}&rows=${rows}`);
  }
  
}
