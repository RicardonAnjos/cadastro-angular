import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Cliente } from '../../models/clientes';
import { ClientesServiceMock } from '../../services/clientes.service';

const NEW_MODE = 'new';
const ADD_CLIENTE_TITLE = 'Adicionar Cliente';
const EDIT_CLIENTE_TITLE = 'Editar Cliente';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit, OnDestroy {
  formMode = NEW_MODE;
  pageTitle = ADD_CLIENTE_TITLE;
  clienteForm: FormGroup;
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: ''
  };
  validationMessages = {
    nome: {},
    cpf: {},
    email: {},
    telefone: {}
  };
  subscription: Subscription = new Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClientesServiceMock
  ) {

    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.formMode = this.route.snapshot.params['id'] ? 'edit' : 'new';
    this.subscription = this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        const name = params.get('name');

        if (id == null || id == '' ) {
          const cliente: Cliente = {
            id: '',
            nome: '',
            cpf: '',
            email: '',
            telefone: ''
          };
          this.showClient(cliente);
        } else {
          this.getClient(id);
        }
      },
    });
  }

  onSubmit() {
    
  }
  getClient(id: string): void {
    this.clienteService.getClienteById(id)
    .subscribe({
      next: (cliente: Cliente) => this.showClient(cliente),
      error: err => console.log(err)
    });
  }

  showClient(cliente: Cliente): void {
    if (this.clienteForm) {
      this.clienteForm.reset();
    }
    this.cliente = cliente;

    if (this.formMode === '') {
      this.pageTitle = ADD_CLIENTE_TITLE;
    } else {
      this.pageTitle = `${EDIT_CLIENTE_TITLE}: ${this.cliente.nome}`;
    }

    this.clienteForm.patchValue({
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      email: this.cliente.email,
      telefone: this.cliente.telefone
    });
  }

  excludeClient(): void {
    if (this.cliente.id === '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente deseja excluir o cliente: ${this.cliente.nome}?`)) {
        this.clienteService.deleteCliente(this.cliente.id as string)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => console.log(err)
        });
      }
    }
  }

  saveClient(): void {
    if (this.clienteForm.valid) {
      if (this.clienteForm.dirty) {
        const cliente = { ...this.cliente, ...this.clienteForm.value };

        if (cliente.id === '') {
          this.clienteService.createCliente(cliente)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => console.log(err)
          });
        } else {
          this.clienteService.updateCliente(cliente)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => console.log(err)
          });
        }
      }
    } else {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.clienteForm.reset();
    this.router.navigate(['/clientes']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
