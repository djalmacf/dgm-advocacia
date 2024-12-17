import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { TestemunhosComponent } from "../testemunhos/testemunhos.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet, TestemunhosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
