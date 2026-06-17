import { Routes } from '@angular/router';
import { Cosechacomponent } from './components/cosechacomponent/cosechacomponent';
import { CosechaList } from './components/cosechacomponent/cosecha-list/cosecha-list';
import { CosechaInsert } from './components/cosechacomponent/cosecha-insert/cosecha-insert';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Lotecomponent } from './components/lotecomponent/lotecomponent';
import { LoteList } from './components/lotecomponent/lote-list/lote-list';
import { LoteInsert } from './components/lotecomponent/lote-insert/lote-insert';
import { LoteUpdate } from './components/lotecomponent/lote-update/lote-update';
import { CosechaUpdate } from './components/cosechacomponent/cosecha-update/cosecha-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },
  {
    path: 'homes',
    component: Homecomponent,
  },
  {
    path: 'cosecha',
    component: Cosechacomponent,
    children: [
      {
        path: 'listar-cosecha',
        component: CosechaList,
      },
      {
        path: 'insertar-cosecha',
        component: CosechaInsert,
      },
      {
        path:'actualizar-cosecha/:id',
        component: CosechaUpdate,
      }
    ],
  },

  {
    path: 'lote',
    component: Lotecomponent,
    children: [
      {
        path: 'listar-lote',
        component: LoteList,
      },
      {
        path: 'insertar-lote',
        component: LoteInsert,
      },
      {
        path: 'actualizar-lote/:id',
        component: LoteUpdate,
      }
    ],
  },
];
