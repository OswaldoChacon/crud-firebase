import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { HeroService } from './../../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Heroe } from 'src/app/models/heroe.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [NgbModal]
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  cargando:boolean = true;
  constructor(
    private heroeService: HeroService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.heroeService.getHeroes().pipe(
      finalize(()=>this.cargando=false)
    ).subscribe(heroes => this.heroes = heroes);
  }

  eliminar(indice: number, heroe: Heroe) {
    this.modalService.open(ConfirmDialogComponent, { centered: true }).result
      .then((confirmed) => {
        if (confirmed) {
          this.heroes.splice(indice, 1);
          this.heroeService.eliminarHeroe(heroe.id).subscribe();
        }        
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
