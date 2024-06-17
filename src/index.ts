import {Soldado} from "./class/Soldado";
import {Oficial} from "./class/Oficial";


const sold = new Soldado("Fulano", 17, 1.80, "fulano@eb.mil.br",1,1412);
console.log("<< SOLDADO >>");
console.log("CIM: ",sold.cim)
console.log("Nome: ",sold.nome);
console.log("e-Mail: ",sold.email," - ", sold.validaEmail()?"Válido":"Inválido");
console.log("Idade: ",sold.idade);
console.log("Altura: ",sold.altura,"m");
console.log("Requisitos: ",sold.requisitos()?"Está apto":"Não está apto", "ao Serviço Militar.");
const oficial = new Oficial("Cicrano", 58, 1.70, "cicrano@gmail.com",1000,1412,10);
console.log("<< OFICIAL >>");
console.log("CIM: ",oficial.cim)
console.log("Nome: ",oficial.nome);
console.log("e-Mail: ",oficial.email," - ", oficial.validaEmail()?"Válido":"Inválido");
console.log("Soldo: ",oficial.soldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
console.log("Patente: ",oficial.getPatente());