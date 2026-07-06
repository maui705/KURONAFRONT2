import { Routes } from '@angular/router';
import { LandingComponent } from './components/landingcomponent/landingcomponent';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioInsert } from './components/usuariocomponent/usuario-insert/usuario-insert';
import { UsuarioUpdate } from './components/usuariocomponent/usuario-update/usuario-update';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';
import { RolInsert } from './components/rolcomponent/rol-insert/rol-insert';
import { RolUpdate } from './components/rolcomponent/rol-update/rol-update';
import { Cosechacomponent } from './components/cosechacomponent/cosechacomponent';
import { CosechaList } from './components/cosechacomponent/cosecha-list/cosecha-list';
import { CosechaInsert } from './components/cosechacomponent/cosecha-insert/cosecha-insert';
import { CosechaUpdate } from './components/cosechacomponent/cosecha-update/cosecha-update';
import { Lotecomponent } from './components/lotecomponent/lotecomponent';
import { LoteList } from './components/lotecomponent/lote-list/lote-list';
import { LoteInsert } from './components/lotecomponent/lote-insert/lote-insert';
import { LoteUpdate } from './components/lotecomponent/lote-update/lote-update';
import { Procesamientocomponent } from './components/procesamientocomponent/procesamientocomponent';
import { ProcesamientoInsert } from './components/procesamientocomponent/procesamiento-insert/procesamiento-insert';
import { ProcesamientoList } from './components/procesamientocomponent/procesamiento-list/procesamiento-list';
import { ProcesamientoUpdate } from './components/procesamientocomponent/procesamiento-update/procesamiento-update';
import { Tipoprocesamientocomponent } from './components/tipoprocesamientocomponent/tipoprocesamientocomponent';
import { TipoProcesamientoInsert } from './components/tipoprocesamientocomponent/tipoprocesamiento-insert/tipoprocesamiento-insert';
import { TipoProcesamientoList } from './components/tipoprocesamientocomponent/tipoprocesamiento-list/tipoprocesamiento-list';
import { TipoProcesamientoUpdate } from './components/tipoprocesamientocomponent/tipoprocesamiento-update/tipoprocesamiento-update';
import { actividadcomponent } from './components/actividadcomponent/actividadcomponent';
import { ActividadList } from './components/actividadcomponent/actividad-list/actividad-list';
import { ActividadInsert } from './components/actividadcomponent/actividad-insert/actividad-insert';
import { ActividadUpdate } from './components/actividadcomponent/actividad-update/actividad-update';
import { Aimagenescomponent } from './components/aimagenescomponent/aimagenescomponent';
import { AimagenesList } from './components/aimagenescomponent/aimagenes-list/aimagenes-list';
import { AimagenesInsert } from './components/aimagenescomponent/aimagenes-insert/aimagenes-insert';
import { AimagenesUpdate } from './components/aimagenescomponent/aimagenes-update/aimagenes-update';
import { ReportQuantityCosecha } from './components/report-quantity-cosecha/report-quantity-cosecha';
import { ReportQuantityLote } from './components/report-quantity-lote/report-quantity-lote';
import { AimagenesBuscarFormato } from './components/aimagenescomponent/aimagenes-buscar-formato/aimagenes-buscar-formato';
import { Reporte1 } from './components/aimagenescomponent/reporte1/reporte1';
import { BuscarDefecto } from './components/aimagenescomponent/buscar-defecto/buscar-defecto';
import { ReportActividadLote } from './components/actividadcomponent/report-actividad-lote/report-actividad-lote';
import { ReportActividadUsuario } from './components/actividadcomponent/report-actividad-usuario/report-actividad-usuario';
import { ReportUsuariosRol } from './components/usuariocomponent/report-usaurios-rol/report-usaurios-rol';
import { ReportPagaUsuarios } from './components/usuariocomponent/report-paga-usuario/report-paga-usuario';
import { Authenticate } from './components/authenticate/authenticate';
import { seguridadGuard } from './guard/seguridad-guard';
import { Menucomponent } from './components/menucomponent/menucomponent';
import { Homecomponent } from './components/homecomponent/homecomponent';

export const routes: Routes = [

  { path: '', 
    redirectTo: 'landing', 
    pathMatch: 'full' 
  },

  {
    path: 'login',
    component: Authenticate,
  },

  { path: 'homes', 
    component: Homecomponent, 
  },

  { path: 'landing', 
    component: LandingComponent, 
  },

  { path: 'menu', 
    component: Menucomponent,
    canActivate: [seguridadGuard] 
  },

  {
    path: 'usuario',
    component: Usuariocomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar-usuario', component: UsuarioList },
      { path: 'registrar-usuario', component: UsuarioInsert },
      { path: 'actualizar-usuario/:id', component: UsuarioUpdate },
      { path: 'cantidad-usuario-rol', component: ReportUsuariosRol },
      { path: 'buscar-pagos-usuario', component: ReportPagaUsuarios },
    ],
  },
  {
    path: 'rol',
    component: Rolcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar-rol', component: RolList },
      { path: 'registrar-rol', component: RolInsert },
      { path: 'actualizar-rol/:id', component: RolUpdate },
    ],
  },
  {
    path: 'cosecha',
    component: Cosechacomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar-cosecha', component: CosechaList },
      { path: 'insertar-cosecha', component: CosechaInsert },
      { path: 'actualizar-cosecha/:id', component: CosechaUpdate },
      { path: 'reporte-cosecha', component: ReportQuantityCosecha },
    ],
  },
  {
    path: 'lote',
    component: Lotecomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar-lote', component: LoteList },
      { path: 'insertar-lote', component: LoteInsert },
      { path: 'actualizar-lote/:id', component: LoteUpdate },
      { path: 'reporte-lote', component: ReportQuantityLote },
    ],
  },
  {
    path: 'procesamiento',
    component: Procesamientocomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard], 
    children: [
      { path: 'insertar', component: ProcesamientoInsert },
      { path: 'listar', component: ProcesamientoList },
      { path: 'editar/:id', component: ProcesamientoUpdate },
    ],
  },
  {
    path: 'tipoprocesamiento',
    component: Tipoprocesamientocomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'insertar', component: TipoProcesamientoInsert },
      { path: 'listar', component: TipoProcesamientoList },
      { path: 'editar/:id', component: TipoProcesamientoUpdate },
    ],
  },
  {
  path: 'actividad',
  component: actividadcomponent,
  canActivate: [seguridadGuard],
  canActivateChild: [seguridadGuard],
  children: [
    { path: 'listar-actividad', component: ActividadList },
    { path: 'registrar-actualizar', component: ActividadInsert },
    { path: 'actualizar-actualizar/:id', component: ActividadUpdate },
    { path: 'reporte-actividad-lote', component: ReportActividadLote },
    { path: 'reporte-actividad-usuario', component: ReportActividadUsuario },
  ],
},
  {
    path: 'aimagenes',
    component: Aimagenescomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar-imagen', component: AimagenesList},
      { path: 'registrar-imagen', component: AimagenesInsert},
      { path: 'actualizar-imagen/:id', component: AimagenesUpdate },
      { path: 'buscar-formato', component: AimagenesBuscarFormato },
      { path: 'reporte1', component: Reporte1 },
      { path: 'buscar-defecto', component: BuscarDefecto }
    ],
  },
];
