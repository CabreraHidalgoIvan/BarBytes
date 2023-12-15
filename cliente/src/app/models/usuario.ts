export class Usuario{
    _id?: number;
    nombre: string;
    psw: string;
    rol: string;
    email:number;

    constructor(nombre: string, psw:string, rol:string, email: number){
        this.nombre = nombre;
        this.psw = psw;
        this.rol= rol;
        this.email = email;
    }
}