import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes'

export class ClientesServiceMock {
  private clientes: Cliente[] = [
    {
      id: '1',
      nome: 'João Silva',
      cpf: '111.222.333-44',
      email: 'joao.silva@gmail.com',
      telefone: '(11) 98765-4321'
    },
    {
      id: '2',
      nome: 'Maria Souza',
      cpf: '222.333.444-55',
      email: 'maria.souza@gmail.com',
      telefone: '(11) 98765-4322'
    },
    {
      id: '3',
      nome: 'José Santos',
      cpf: '333.444.555-66',
      email: 'jose.santos@gmail.com',
      telefone: '(11) 98765-4323'
    }
  ];

  getClientes() {
    return new Observable<Cliente[]>(observer => {
      observer.next(this.clientes);
      observer.complete();
    });
  }

  getClienteById(id: string) {
    const cliente = this.clientes.find(c => c.id === id);
    return new Observable<Cliente>(observer => {
      observer.next(cliente);
      observer.complete();
    });
  }

  addCliente(cliente: Cliente) {
    return new Observable<Cliente>(observer => {
      cliente.id = (this.clientes.length + 1).toString();
      this.clientes.push(cliente);
      observer.next(cliente);
      observer.complete();
    });
  }

  updateCliente(id: string, cliente: Cliente) {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index >= 0) {
      cliente.id = id;
      this.clientes[index] = cliente;
      return new Observable<Cliente>(observer => {
        observer.next(cliente);
        observer.complete();
      });
    } else {
      return new Observable<never>(observer => {
        observer.error(`Cliente com id ${id} não encontrado.`);
      });
    }
  }

  deleteCliente(id: string) {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index >= 0) {
      this.clientes.splice(index, 1);
      return new Observable<void>(observer => {
        observer.next();
        observer.complete();
      });
    } else {
      return new Observable<never>(observer => {
        observer.error(`Cliente com id ${id} não encontrado.`);
      });
    }
  }
}
