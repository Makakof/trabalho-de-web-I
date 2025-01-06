import { StorageService } from './../service/storage.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})

export class PerfilComponent implements OnInit{

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router)

  form = this.fb.nonNullable.group({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  user: any;

  ngOnInit(): void{
    this.user = this.authService.getCurrentUserValue();
  }

  alterarNome(){
    this.userService.updateName(this.user.id as string, this.form.value.name as string).subscribe((resp) =>{
      this.storageService.set('user', resp);
      this.router.navigate(['user', 'login']);
    });
  }

  alterarEmail(){
    this.userService.updateEmail(this.user.id as string, this.form.value.email as string).subscribe((resp) =>{
      this.storageService.set('user', resp);
      this.router.navigate(['user', 'login']);
    });
  }

  alterarPassword(){
    if(this.form.value.password === this.form.value.confirmPassword){
      this.userService.updatePassword(this.user.id as string, this.form.value.password as string).subscribe((resp) =>{
        this.storageService.set('user', resp);
      });
    }
  }

}
