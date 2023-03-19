import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Cliente } from '../../models/clientes';
import { ClientesServiceMock } from '../../services/clientes.service';

const NEW_MODE = 'new';
const EDIT_MODE = 'edit';
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
  clienteForm: FormGroup = new FormGroup({});
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: ''
  };
  validationMessages = {
    nome: {
      required: 'O nome é obrigatório',
      minlength: 'O nome deve ter no mínimo 2 caracteres',
    },
    cpf: {
      required: 'O CPF é obrigatório',
      minlength: 'O CPF deve ter no mínimo 11 caracteres',
    },
    email: {
      required: 'O email é obrigatório',
      email: 'O email deve ser válido',
    },
    telefone: {
      required: 'O telefone é obrigatório',
    }
  };
  subscription = new Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClientesServiceMock
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initFormMode();
    this.initRoutePatamsSubscription();
  }

   initForm(): void {
    this.clienteForm = this.fb.group({
      nome: [this.cliente.nome, [Validators.required, Validators.minLength(2)]],
      cpf: [this.cliente.cpf, [Validators.required, Validators.minLength(11)]],
      email: [this.cliente.email, [Validators.required, Validators.email]],
      telefone: [this.cliente.telefone, [Validators.required]]
    });
  }

   initFormMode(): void {
    const id = this.route.snapshot.params['id']
    this.formMode = id ? EDIT_MODE : NEW_MODE;
  }

   initRoutePatamsSubscription(): void {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (!id) {
          this.showClient(this.cliente);
        } else{
          this.getClient(id);
        }
      }));
  }

  onSubmit(): void {
    this.saveCliente();
  }

   getClient(id: string): void {
    this.subscription.add(
      this.clienteService.getClienteById(id).subscribe({
        next: (cliente: Cliente) => this.showClient(cliente),
        error: err => console.log(err)
      })
    );
  }

   showClient(cliente: Cliente): void {
    this.clienteForm.reset();
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
    })
  }

   excludClient(): void {
    if (!this.cliente.id) {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir o cliente: ${this.cliente.nome}?`)) {
        this.clienteService.deleteCliente(this.cliente.id).subscribe({
          next: () => this.onSaveComplete(),
          error: err => console.log(err)
        });
      }
    }
  }

   saveCliente(): void {
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
      } else {
        this.onSaveComplete();
      }
    } else {
      Object.keys(this.clienteForm.controls).forEach(key => {
        this.clienteForm.controls[key].markAsTouched();
      });
    }
  }
  

  onSaveComplete(): void {
    this.clienteForm.reset();
    this.router.navigate(['/clientes']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}