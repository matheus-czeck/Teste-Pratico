import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
