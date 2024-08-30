import { HttpLaravelService } from '../http.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-actualizar',
  templateUrl: './crear-actualizar.component.html',
  styleUrls: ['./crear-actualizar.component.css']
})
export class CrearActualizarComponent {

  public CrearActualizarFormulario: FormGroup;
  tipos = [
    { name: 'Normal', code: 'normal' },
    { name: 'Agua', code: 'agua' },
    { name: 'Fuego', code: 'fuego' },
    { name: 'Planta', code: 'planta' },
    { name: 'Eléctrico', code: 'electrico' },
    { name: 'Hielo', code: 'hielo' },
    { name: 'Lucha', code: 'lucha' },
    { name: 'Veneno', code: 'veneno' },
    { name: 'Tierra', code: 'tierra' },
    { name: 'Volador', code: 'volador' },
    { name: 'Psíquico', code: 'psiquico' },
    { name: 'Bicho', code: 'bicho' },
    { name: 'Roca', code: 'roca' },
    { name: 'Fantasma', code: 'fantasma' },
    { name: 'Dragón', code: 'dragon' },
    { name: 'Siniestro', code: 'siniestro' },
    { name: 'Acero', code: 'acero' },
    { name: 'Hada', code: 'hada' }
  ];
 
  ID?: number;

  constructor(
    private fb: FormBuilder, 
    public servicio: HttpLaravelService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {
    this.CrearActualizarFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nivel: [''],
      puntos_de_salud: [''],
      ataque: [''],
      defensa: [''],
      velocidad: [''],
      url: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID !== undefined) {
        this.obtenerData();
      }
    });
  }

  isValid(field: string): boolean {
    const control = this.CrearActualizarFormulario.controls[field];
    return !!(control.errors && control.touched);
  }

  obtenerData() {
    if (this.ID !== undefined) {
      this.servicio.Service_Get('pokemones', this.ID).subscribe((res: any) => {
        if (res.estatus) {
          this.CrearActualizarFormulario.patchValue(res.data);
        } else {
          Swal.fire({
            icon: "error",
            title: res.message,
            showConfirmButton: true,
            timer: 1500
          });
          this.router.navigate(['/vista-general']);
        }
      });
    }
  }

  get f() { return this.CrearActualizarFormulario.controls; }

  Guardar() {
    if (this.CrearActualizarFormulario.invalid) {
      this.CrearActualizarFormulario.markAllAsTouched();
      return;
    }
  
    // Convertir el tipo a string si es necesario
    const formularioData = this.CrearActualizarFormulario.value;
    formularioData.tipo = formularioData.tipo ? formularioData.tipo.code : '';
  
    if (this.ID === undefined) {
      this.servicio.Service_Post('pokemones', '', formularioData).subscribe((res: any) => {
        if (res.estatus) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokémon creado',
            showConfirmButton: true,
            timer: 1500
          });
          this.CrearActualizarFormulario.reset();
          this.router.navigate(['/vista-general']);
        } else {
          this.mostrarErrores(res.mensaje);
        }
      });
    } else {
      this.servicio.Service_Patch('pokemones', this.ID, formularioData).subscribe((res: any) => {
        if (res.estatus) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokémon modificado',
            showConfirmButton: true,
            timer: 1500
          });
          this.CrearActualizarFormulario.reset();
          this.router.navigate(['/vista-general']);
        } else {
          this.mostrarErrores(res.mensaje);
        }
      });
    }
  }
  
  
  private mostrarErrores(mensajes: any) {
    let message = '';
    for (const [key, value] of Object.entries(mensajes)) {
      message += `${key}: ${value}\n`;
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message.trim(),
      showConfirmButton: true,
      timer: 1500
    });
  }
  
}
