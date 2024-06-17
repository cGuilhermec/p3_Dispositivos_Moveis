import { Militar } from "./Militar";


export class Soldado extends Militar {

    cim: number;
    soldado: number;

    constructor(nome: string, idade: number, altura: number, email: string, cim: number, soldado: number){

        super(nome, idade, altura, email);
        this.cim = cim;
        this.soldado = soldado;

    };

    validaEmail(): boolean {
        const regex = /^[\w-\.]+@(eb|marinha|fab)\.mil\.br$/;
        return regex.test(this.email);
    };

    requisitos(): boolean {
        return this.altura >= 1.60 && this.idade >= 18 && this.idade <= 32;
    };

}