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

    constructor(private clientesService: ClientesServiceMock) { }

    ngOnInit() {
        this.getCliente();
    }

    getCliente() {
        this.clientesService.getClientes().subscribe((clientes) => {
            this.clientes = clientes;
        },
        (error) => {
            console.log(error);
        }
        );
    }
}
