import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './clientes/components/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './clientes/components/lista-cliente/lista-cliente.component';

const routes: Routes = [
  { path: '', component: ListaClienteComponent},
  { path: 'clientes', component: ListaClienteComponent },
  { path: 'cadastrar', component: CadastroClienteComponent },
  { path: 'clientes/:id', component: CadastroClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
