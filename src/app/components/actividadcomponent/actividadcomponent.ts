import { Component } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ActividadList } from "./actividad-list/actividad-list";

@Component({
    selector: 'app-actividadcomponent',
    imports: [RouterOutlet, ActividadList],
    templateUrl: './actividadcomponent.html',
    styleUrl: './actividadcomponent.css',
})
export class actividadcomponent {
    constructor (public route:ActivatedRoute){}
}