import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) {
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
    this.authService.login(usuario, password).subscribe(() => {
      this.succes('User');
    }, error => {
      this.error();
    })
    /*if(usuario=="admin1" && password=="admin123"){
      this.router.navigate(['User']);
    }else{
      this.error();
      this.form.reset();
    }*/
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
