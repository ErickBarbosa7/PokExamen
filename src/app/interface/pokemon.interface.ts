export interface Pokemon {
  id?: number;
  nombre: string;
  tipo: string; 
  puntos_de_salud: number;
  ataque: number;
  defensa: number;
  velocidad: number;
  url?: string;  
  creadoPor: string; 
  fechaActualizacion: string;
}
