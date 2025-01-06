import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {

  user = { name: '', email: '', password: '' };
  confirmPassword = '';
  message = ''; // Propriedade para exibir mensagem de confirmação

  private readonly userService = inject(UserService);

  register() {
    if (this.user.password === this.confirmPassword) {
      this.userService.createUser(this.user).subscribe(
        (response) => {
          console.log('Usuário cadastrado com sucesso!', response);
          this.message = 'Usuário cadastrado com sucesso!'; // Define a mensagem de sucesso this.resetForm(); // Reseta o formulário
          this.resetForm(); // Reseta o formulário
        },
        (error) => {
          console.error('Erro ao cadastrar usuário', error);
        }
      );
    } else {
      console.error('Senhas não coincidem.');
    }
  }

  resetForm() {
    this.user = { name: '', email: '', password: '' };
    this.confirmPassword = '';
  }
}
