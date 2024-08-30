import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpLaravelService } from '../http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css'
})
export class VistaComponent {

  ID: number = 0;
  Datos: any;
  constructor(
    private servicio: HttpLaravelService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.params.subscribe(params => {
        console.log(params)
        this.ID = params['id'];
        this.obtenerData();
      });
    }
    EliminarRegistro(id:number){
      Swal.fire({
        title: "¿Estas seguro de eliminar?",
        text: "Esto ya no se puede revertir !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText:"Cancelar",
        confirmButtonText: "Si eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicio.Service_Delete('pokemones',id).subscribe((res:any)=>{
            if(res.estatus){
              Swal.fire({
                title: "Eliminado!",  
                text:res.mensaje,
                icon: "success"
              }).then(() => {
                this.router.navigate(['/vista-general']);
              })
              
              this.obtenerData();         }          
          });
        }
      });
      
    }
   obtenerData(){
    this.servicio.Service_Get('pokemones', this.ID).subscribe((res : any) => {
      console.log("res:",res);
      if(res.estatus){
        this.Datos = res.data;
      }
    });
    }
}
