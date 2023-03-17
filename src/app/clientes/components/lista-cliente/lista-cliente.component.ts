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
    getCliente() {
        this.clientesService.getClientes().subscribe(clientes => {
            this.clientes = clientes;
        });
    }

    getclienteById(id: string) {
        this.clientesService.getClienteById(id).subscribe(cliente => {
            console.log(cliente);
        });
    }

    addCliente(cliente: Cliente) {
        this.clientesService.addCliente(cliente).subscribe(cliente => {
            this.clientes.push(cliente);
        });
    }

    updateCliente(id: string) {
        this.clientesService.getClienteById(id).subscribe(cliente => {
            cliente.nome = "Novo nome";
            this.clientesService.updateCliente(id, cliente).subscribe(cliente => {
                console.log(cliente);
            });
        });
    }

    deleteCliente(id: string) {
        this.clientesService.getClienteById(id).subscribe(cliente => {
            this.clientesService.deleteCliente(id).subscribe(() => {
                const index = this.clientes.indexOf(cliente);
                if (index >= 0) {
                    this.clientes.splice(index, 1);
                }
            });
        });
    }
    
    ngOnInit() {
        this.getCliente();
        this.getclienteById('1');
        this.addCliente({
            id: '6',
            nome: 'Roberto Oliveira',
            cpf: '999.888.777-66',
            email: 'robertosilva@gmail.com',
            telefone: '(94) 99888-5522',
        });
        this.updateCliente('1');
        this.deleteCliente('1');
    }
}
