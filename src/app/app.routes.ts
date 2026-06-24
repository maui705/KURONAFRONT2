import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioInsert } from './components/usuariocomponent/usuario-insert/usuario-insert';
import { UsuarioUpdate } from './components/usuariocomponent/usuario-update/usuario-update';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';
import { RolInsert } from './components/rolcomponent/rol-insert/rol-insert';
import { RolUpdate } from './components/rolcomponent/rol-update/rol-update';

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
        path:'usuario',
        component:Usuariocomponent,
        children:[
            {
                path:'listar-usuario',
                component:UsuarioList
            },
            {
                path:'registrar-usuario',
                component:UsuarioInsert
            },
            {
                path:'actualizar-usuario/:id',
                component:UsuarioUpdate
            }
        ]
    },
    {
        path:'rol',
        component:Rolcomponent,
        children:[
            {
                path:'listar-rol',
                component:RolList
            },
            {
                path:'registrar-rol',
                component:RolInsert
            },
            {
                path:'actualizar-rol/:id',
                component:RolUpdate
            }
        ]
    }
];
