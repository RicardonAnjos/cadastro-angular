import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/clientes';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
    clientes: Cliente[] = [];

    constructor() { }

    getClientes() {
        this.clientes = [
            {
                id: '1',
                nome: 'João da Silva',
                cpf: '123.456.789-00',
                email: 'joao.silva@gmail.com',
                telefone: '(11) 99999-9999',
            },
            {
                id: '2',
                nome: 'Maria dos Santos',
                cpf: '987.654.321-00',
                email: 'maria.santos@gmail.com',
                telefone: '(21) 98888-8888',
            },
            {
                id: '3',
                nome: 'Pedro Almeida',
                cpf: '111.222.333-44',
                email: 'pedro.almeida@gmail.com',
                telefone: '(47) 97777-7777',
            },
            {
                id: '4',
                nome: 'Luiza Andrade',
                cpf: '555.666.777-88',
                email: 'luiza.andrade@gmail.com',
                telefone: '(31) 96666-6666',
            },
            {
                id: '5',
                nome: 'Roberto Oliveira',
                cpf: '999.888.777-66',
                email: 'roberto.oliveira@gmail.com',
                telefone: '(51) 95555-5555',
            },
        ];
    }

    ngOnInit(): void {
        this.getClientes();
    }
}
