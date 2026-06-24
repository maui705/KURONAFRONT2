import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { ActividadList } from './components/actividadcomponent/actividad-list/actividad-list';
import { actividadcomponent } from './components/actividadcomponent/actividadcomponent';
import { ActividadUpdate } from './components/actividadcomponent/actividad-update/actividad-update';
import { ActividadInsert } from './components/actividadcomponent/actividad-insert/actividad-insert';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { UsuarioInsert } from './components/usuariocomponent/usuario-insert/usuario-insert';
import { UsuarioUpdate } from './components/usuariocomponent/usuario-update/usuario-update';
import { Aimagenescomponent } from './components/aimagenescomponent/aimagenescomponent';
import { AimagenesList } from './components/aimagenescomponent/aimagenes-list/aimagenes-list';
import { AimagenesInsert } from './components/aimagenescomponent/aimagenes-insert/aimagenes-insert';
import { AimagenesUpdate } from './components/aimagenescomponent/aimagenes-update/aimagenes-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full'
  },
  {
    path: 'homes',
    component: Homecomponent
  },
  {
    path: 'actividad',
    component: actividadcomponent,
    children: [
      {
        path: 'listar-actividad',
        component: ActividadList
      },
      {
        path: 'registrar-actualizar',
        component: ActividadInsert
      },
      {
        path: 'actualizar-actualizar/:id',
        component: ActividadUpdate
      }
    ]
  },
  {
    path: 'usuario',
    component: Usuariocomponent,
    children: [
      {
        path: 'listar-usuario',
        component: UsuarioList
      },
      {
        path: 'registrar-usuario',
        component: UsuarioInsert
      },
      {
        path: 'actualizar-usuario/:id',
        component: UsuarioUpdate
      }
    ]

  },
  {
    path: 'aimagenes',
    component: Aimagenescomponent,
    children: [
      {
        path: 'listar-imagen',
        component: AimagenesList
      },
      {
        path: 'registrar-imagen',
        component: AimagenesInsert
      },
      {
        path: 'actualizar-imagen/:id',
        component: AimagenesUpdate
      }
    ]
  }


];
