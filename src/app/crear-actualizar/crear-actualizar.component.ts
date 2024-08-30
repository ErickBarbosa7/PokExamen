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
  typeColors = {
    normal: '#D0D0D0',
    agua: '#5AB2FF',
    fuego: '#fc9d03',
    planta: '#4FCF53',
    veneno: '#CF4FC3',
    volador: '#A7E6FF',
    electrico: '#FFE605',
    hielo: '#98D8D8',
    lucha: '#de1440',
    bicho: 'greenyellow',
    psiquico: '#F85888',
    acero: '#B8B8D0',
    oscuro: '#705848',
    dragon: '#003285',
    tierra: '#6F4E37',
    hada: '#ff80ff',
    fantasma: '#850F8D',
    roca: '#373A40',
  };
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
    console.log('Formulario es válido:', this.CrearActualizarFormulario.valid);  
    console.log('Datos del formulario:', this.CrearActualizarFormulario.value);  
  
    if (this.CrearActualizarFormulario.invalid) {
      this.CrearActualizarFormulario.markAllAsTouched();
      console.log('Formulario es inválido'); 
      return;
    }
  
    if (this.ID === undefined) {
      this.servicio.Service_Post('pokemones', '', this.CrearActualizarFormulario.value).subscribe((res: any) => {
        console.log('Respuesta de creación:', res); 
        if (res.estatus) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pokémon creado",
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
      if (this.ID !== undefined) {
        this.servicio.Service_Patch('pokemones', this.ID, this.CrearActualizarFormulario.value).subscribe((res: any) => {
          console.log('Respuesta de modificación:', res); 
          if (res.estatus) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Pokémon modificado",
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
