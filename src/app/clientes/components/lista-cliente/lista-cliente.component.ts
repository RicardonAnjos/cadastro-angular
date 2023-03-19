import { Component, OnInit } from '@angular/core';
import { ClientesServiceMock } from '../../services/clientes.service'
import { Cliente } from '../../models/clientes';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css'],
  providers: [ClientesServiceMock]
})
export class ListaClienteComponent implements OnInit {
    clientes: Cliente[] = [];
    deletingClienteId: string | undefined;

    constructor(private clientesService: ClientesServiceMock) { }

    ngOnInit() {
        this.getCliente();
    }

    getCliente(): void {
        this.clientesService.getClientes().subscribe({
            next: (clientes) => this.clientes = clientes,
            error: (error) => console.log(error)
        });
      }

      deleteCliente(id: string) {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            this.deletingClienteId = id;
            this.clientesService.deleteCliente(id).subscribe(() => {
                this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
                this.deletingClienteId = '';
            })
        }
    }
}
