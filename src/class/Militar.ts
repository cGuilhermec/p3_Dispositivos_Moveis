

export abstract class Militar{

    nome: string;
    idade: number;
    altura: number;
    email: string;

    constructor(nome: string, idade: number, altura: number, email: string){

        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.email = email;

    };

    abstract validaEmail(): boolean;

}