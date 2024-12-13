import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contato',
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  phone: string = '';
  message: string = '';
  emailError: string = '';
  phoneError: string = '';
  formSubmitted: boolean = false;

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  isValidPhone(phone: string): boolean {
    const phonePattern = /^\(\d{2}\) 9\d{4}-\d{4}$/; // Formato (DD) 9XXXX-XXXX
    return phonePattern.test(phone);
  }

  onSubmit() {
    this.emailError = '';
    this.phoneError = '';
    this.formSubmitted = false;

    if (!this.isValidEmail(this.email)) {
      this.emailError = 'Por favor, insira um e-mail válido.';
      return;
    }

    if (!this.isValidPhone(this.phone)) {
      this.phoneError = 'Por favor, insira um número de celular válido no formato (DD) 9XXXX-XXXX.';
      return;
    }

    if (this.emailError || this.phoneError) {
      return;
    }

    this.formSubmitted = true;
    
    console.log('Formulário enviado!', this.name, this.email, this.subject, this.phone, this.message);

    setTimeout(() => {
      this.closePopup();
    }, 5000);
  }

    closePopup() {
    this.formSubmitted = false;
  }
}
