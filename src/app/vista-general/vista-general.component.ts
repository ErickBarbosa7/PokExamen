import { Component } from '@angular/core';
import { HttpLaravelService } from '../http.service';
import { Pokemon } from '../interface/pokemon.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrls: ['./vista-general.component.css']
})
export class VistaGeneralComponent {
  pokemones: Pokemon[] = [];
  datos: any;

  page: number = 0;
  rows: number = 3;
  total: number = 0; 

  constructor(private servicio: HttpLaravelService) {
    this.obtenerData();
  }


  
  obtenerData() {
    this.servicio.Service_Get_Pagina('pokemones','',this.page,this.rows).subscribe((res:any)=>{
      console.log(res);
      if (res.data) {
        this.pokemones = res.data;
        this.total = res.total; 
        console.log('Pokemones:', this.pokemones); 
      }
    });
  }

  EliminarRegistro(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "Esto ya no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.Service_Delete('pokemones', id).subscribe((res: any) => {
          if (res.estatus) {
            Swal.fire({
              title: "¡Eliminado!",
              text: res.mensaje,
              icon: "success"
            });
            this.obtenerData(); 
          }          
        });
      }
    });
  }

  onPageChange(event: any) {
    console.log(event);
    this.page = event.page;
    this.rows = event.rows;
    this.obtenerData();
  }
}
