import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../models/heroe.model';
import { FormGroup } from '@angular/forms';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'https://crud-heroe-aa934.firebaseio.com';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  guardar(heroe: FormGroup) {
    return this.http.post(`${this.url}/heroes.json`, heroe.value).pipe(
      map((res: any) => {
        heroe.get('id').setValue(res.name);
        return res;
      })
    );
  }

  actualizar(id: string, heroe: FormGroup) {
    return this.http.put(`${this.url}/heroes/${id}.json`, heroe.value);
  }

  getHeroes() {
    return this.http.get<Heroe[]>(`${this.url}/heroes.json`).pipe(
      map(this.crearArreglo),
      delay(2000),
    );
  }

  getHeroe(id: string) {
    return this.http.get<Heroe>(`${this.url}/heroes/${id}.json`).pipe(
      map(heroe => {
        !heroe ? this.router.navigate(['/heroes']) : heroe
        return heroe;
      })
    )
  }

  eliminarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  crearArreglo(heroesObject: Object) {
    const heroes = [];
    if (heroesObject === null)
      return [];
    Object.keys(heroesObject).forEach(key => {
      const heroe: Heroe = heroesObject[key]
      heroe.id = key;
      heroes.push(heroe);
    }
    );
    return heroes;
  }
}
