import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpLaravelService } from '../http.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-actualizar',
  templateUrl: './crear-actualizar.component.html',
  styleUrls: ['./crear-actualizar.component.css'],
  providers: [MessageService]
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
    private router: Router,
    private messageService: MessageService
  ) {
    this.CrearActualizarFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      puntos_de_salud: ['', [Validators.max(999)]],
      ataque: ['', [Validators.max(99)]],
      defensa: ['', [Validators.max(99)]],
      velocidad: ['', [Validators.max(99)]],
      url: ['']
    });

    this.CrearActualizarFormulario.get('puntos_de_salud')?.valueChanges.subscribe(value => {
      this.limitarValor('puntos_de_salud', 999);
    });

    ['ataque', 'defensa', 'velocidad'].forEach(field => {
      this.CrearActualizarFormulario.get(field)?.valueChanges.subscribe(value => {
        this.limitarValor(field, 99);
      });
    });

    this.activatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID !== undefined) {
        this.obtenerData();
      }
    });
  }
  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}
  limitarValor(campo: string, limite: number) {
    const control = this.CrearActualizarFormulario.get(campo);
    if (control) {
      const valor = control.value;
      if (valor > limite) {
        control.setValue(limite, { emitEvent: false });
      }
    }
  }

  isValid(field: string): boolean {
    const control = this.CrearActualizarFormulario.controls[field];
    return !!(control.errors && control.touched);
  }

  obtenerData() {
    if (this.ID !== undefined) {
      this.servicio.Service_Get('pokemones', this.ID).subscribe((res: any) => {
        if (res.estatus) {
          const pokemonData = res.data;
          pokemonData.tipo = this.tipos.find(tipo => tipo.code === pokemonData.tipo);
  
          this.CrearActualizarFormulario.patchValue(pokemonData);
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: res.message});
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
  
    const formularioData = this.CrearActualizarFormulario.value;
    formularioData.tipo = formularioData.tipo ? formularioData.tipo.code : '';
  
    if (this.ID === undefined) {
      this.servicio.Service_Post('pokemones', '', formularioData).subscribe((res: any) => {
        if (res.estatus) {
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Pokémon creado'});
          this.CrearActualizarFormulario.reset();
          this.router.navigate(['/vista-general']);
        } else {
          this.mostrarErrores(res.mensaje);
        }
      });
    } else {
      this.servicio.Service_Patch('pokemones', this.ID, formularioData).subscribe((res: any) => {
        if (res.estatus) {
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Pokémon modificado'});
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
    this.messageService.add({severity: 'error', summary: 'Error', detail: message.trim()});
  }
}
