import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
  ],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos  {
  @Input() produtos: any[] | null = []

  @Input() control!: AbstractControl | null;

  get formControlSelecionados(): FormControl {
    return this.control as FormControl;
  }
}
