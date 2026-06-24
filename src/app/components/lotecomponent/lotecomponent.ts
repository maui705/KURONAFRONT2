import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LoteList } from './lote-list/lote-list';

@Component({
  selector: 'app-lotecomponent',
  imports: [RouterOutlet, LoteList],
  templateUrl: './lotecomponent.html',
  styleUrl: './lotecomponent.css',
})
export class Lotecomponent {
  constructor(public route:ActivatedRoute){}
}
