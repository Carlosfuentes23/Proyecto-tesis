import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    //Priemras pruebas para la redireccion del login
    if(usuario=="admin1" && password=="admin123"){
      this.router.navigate(['users/admin']);
    }else if (usuario=="leader1" && password=="leader123"){
      this.router.navigate(['users/leader']);
    }else if(usuario=="member1" && password=="member123"){
      const url = 'users/member';
      this.router.navigate(['users/member']);
    }else{
      this.error();
      this.form.reset();
    }
  }

  //Funcion para muestra error en el login
  error(){
    Swal.fire({
      icon: 'error',
      title: 'Usuario o Contraseña inválido',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Inténtalo de Nuevo'
    })
  }

  succes(url:string){

    this.router.navigate([url]);
  }
}
