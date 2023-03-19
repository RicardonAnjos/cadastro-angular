import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Cliente } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesServiceMock {
  [x: string]: any;
  private apiURL = 'http://localhost:5000/clientes';
  private jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL)
    .pipe(
      catchError(this.handleError)
    );
  }

  getClienteById(id: string): Observable<Cliente> {
    if (id === '') {
      return of(this.initializeCliente());
    }
    
    return this.http.get<Cliente>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente, { headers: this.jsonHeader })
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente, { headers: this.jsonHeader })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCliente(id: string): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): never {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Backend returned code ${err.status}: ${err.statusText || ''}`;
    }

    throw new Error(errorMessage);
  }

  private initializeCliente(): Cliente {
    return {
      id: '',
      nome: '',
      cpf: '',
      email: '',
      telefone: ''
    };
  }
}
