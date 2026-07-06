import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AimagenesList } from './aimagenes-list/aimagenes-list';

@Component({
  selector: 'app-aimagenescomponent',
  imports: [RouterOutlet, AimagenesList],
  templateUrl: './aimagenescomponent.html',
  styleUrl: './aimagenescomponent.css',
})
export class Aimagenescomponent {
  constructor (public route:ActivatedRoute){}
}
