export interface Libros{
    id?:number;
    titulo:string;
    genero:string;
    autor:string;
    publicacion:string;
    anio:number;
    imagen:string;
    precio:number;
}
export interface RespuestaBooks{
    data:Libros[];
}