import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CosechaList } from './cosecha-list/cosecha-list';


@Component({
  selector: 'app-cosechacomponent',
  imports: [RouterOutlet, CosechaList],
  templateUrl: './cosechacomponent.html',
  styleUrl: './cosechacomponent.css',
})
export class Cosechacomponent {
  constructor(public route:ActivatedRoute){}
}
