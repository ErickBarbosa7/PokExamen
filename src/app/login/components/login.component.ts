import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpLaravelService } from '../../http.service';
import { LocalstorageService } from '../../localstorage.service';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: HttpLaravelService,
    private router: Router,
    private localStorage: LocalstorageService
  ) {
    this.Formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.localStorage.clean();
  }

  get f() { return this.Formulario.controls; }

  onLoggedin() {
    // Verifica si el formulario es válido
    if (this.Formulario.invalid) {
      // Muestra un mensaje de error si el formulario es inválido
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Por favor, complete todos los campos obligatorios.'
      });
      return;
    }

    this.service.Service_Post('user', 'login', this.Formulario.value).subscribe(
      (data: any) => {
        console.log(data);

        if (data.estatus) {
          this.localStorage.setItem('accessToken', data.access_token);
          this.router.navigate(['/vista-general']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login fallido',
            text: 'Credenciales incorrectas. Por favor, intente de nuevo.'
          });
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar iniciar sesión. Por favor, intente más tarde.'
        });
      }
    );
  }
}
