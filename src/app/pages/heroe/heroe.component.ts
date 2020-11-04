import { Heroe } from './../../models/heroe.model';
import { HeroService } from './../../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  formHeroe = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    nombre: ['', [Validators.required]],
    habilidad: ['', [Validators.required]],
    vivo: [true, [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private heroeService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param !== 'nuevo') {
      this.heroeService.getHeroe(param).subscribe(heroe=>{
        if(heroe){
        this.formHeroe.get('id').setValue(param);
        this.formHeroe.patchValue(heroe)
        }        
      });
    }
  }

  get vivo() {
    return this.formHeroe.get('vivo').value
  }

  cambiarEstado() {
    this.formHeroe.get('vivo').setValue(!this.vivo);
  }

  get id() {
    return this.formHeroe.get('id').value;
  }

  guardar() {
    this.heroeService.guardar(this.formHeroe).subscribe();
  }

  actualizar() {
    this.heroeService.actualizar(this.id, this.formHeroe).subscribe();
  }
  
}
