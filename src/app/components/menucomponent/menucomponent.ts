import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
<<<<<<< HEAD
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menucomponent',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {}
=======
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {}
>>>>>>> 705ecc2e07b50bb735d6edb7e14f4e666295a4e8
