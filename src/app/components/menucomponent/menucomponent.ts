import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatMenuModule],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  role: string = '';
  usuario: string = '';

  constructor(private loginService: LoginService) { }

  cerrar() {
    sessionStorage.clear();
  }


  verificar(): boolean {

    const existe = this.loginService.verificar();

    if (existe) {
      this.role = this.loginService.showRole() ?? '';
    }

    return existe;
  }
  isADMIN() {
    return this.role === 'ADMIN';
  }

  isAGRI() {
    return this.role === 'AGRI';
  }

  isING() {
    return this.role === 'ING';
  }
}
