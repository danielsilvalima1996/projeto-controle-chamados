import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param json recebe um JSON com chave e valor
   * EX: {"nome": "Daniel", filter: "pesquisa"}
   * @returns retornas uma string separando chave e valor com & '"E" comercial'
   *  nome="Daniel"&filter=pesquisa
   */
  getParameters(json) {
    return Object.keys(json).map((key) => {
      if (json[key] === undefined || json[key] === null) {
        json[key] = '';
      }
      return `${key}=${json[key]}`;
    }).join('&');
  }

  /**
   * terceira versão
   * @param date date
   * @returns yyyy-MM-dd
   */
  formatDate(date: string) {
    return date.split('T')[0];
  }

  /**
   *
   * @param windowHeight innerHeight
   * @param percent valor em percentual para calcular o tamanho da tela
   */
  calcularHeight(windowHeight: number, percent: number) {
    windowHeight = innerHeight;
    windowHeight = windowHeight * percent;
    return windowHeight;
  }

  /**
   * Função retorna o dia atual formatado
   * @returns hoje = 'yyyy-mm-dd' => 2019-07-31
   */
  dataAtual() {
    let today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let hoje = yyyy + '-' + mm + '-' + dd;
    return hoje;
  }

  /**
   * Função retorna a hora atual formatada
   * @returns hh:mm => 14:39
   */
  horaAtual() {
    let hoje = new Date();
    let hh = hoje.getHours();
    let hora;
    let mm = hoje.getMinutes();
    let minuto;
    if (hh < 10) {
      hora = `0${hh}`
    } else {
      hora = hh;
    }
    if (mm < 10) {
      minuto = `0${mm}`
    } else {
      minuto = mm;
    }
    let horaAtual = `${hora}:${minuto}`;
    return horaAtual;
  }

  /**
   * 
   * @param campoTexto Recebe uma string com o CPF ou CNPJ
   * ela verifica se é CNPJ ou CPF, e chama a respectiva função que formata
   * @returns uma string formatada
   */
  formatarCnpjCpf(campoTexto: string) {
    if (campoTexto.length <= 11) {
      campoTexto = this.mascaraCpf(campoTexto);
    } else {
      campoTexto = this.mascaraCnpj(campoTexto);
    }
    return campoTexto;
  }

  /**
   * 
   * @param campoTexto Recebe uma string com o CPF ou CNPJ
   * retirar os pontos e traços da string
   * @returns uma string de numeros
   */
  retirarFormatacaoCnpjCpf(campoTexto: string) {
    campoTexto = campoTexto.replace(/(\.|\/|\-)/g, "");
  }

  /**
   * 
   * @param valor recebe CPF, somente números
   * @returns uma string formatada em CPF
   */
  private mascaraCpf(valor: string) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  }

  /**
   * 
   * @param valor recebe CPF, somente números
   * @returns uma string formatada em CNPJ
   */
  private mascaraCnpj(valor: string) {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
  }

  /**
   * 
   * @param telefone recebe uma string com número de telefone ou celular
   * @returns uma string formatada utilizando como paramêtro o length da string
   */
  mascaraDeTelefone(telefone) {
    const textoAtual = telefone;
    const isCelular = textoAtual.length === 9;
    let teleCel;
    if (isCelular) {
      teleCel = textoAtual.replace(/(\d{5})(\d{4})/,
        function (regex, arg1, arg2) {
          return arg1 + '-' + arg2;
        });
    } else {
      const parte1 = textoAtual.slice(0, 4);
      const parte2 = textoAtual.slice(4, 8);
      teleCel = `${parte1}-${parte2}`
    }
    return teleCel;
  }

  /**
   * 
   * @param telefone recebe uma string com pontos e traços
   * @returns string somente números
   */
  removeMascaraDeTelefone(telefone) {
    telefone = telefone.replace(/[^0-9]+/g, '');
    return telefone;
  }

  /**
   * 
   * @param string dados a ser convertido, recebe qualquer tipo de dados
   * @returns se string convert em uppercase, senão devolve o valor
   * 
   */
  convertUpperCase(string: any) {
    let filter = string;
    filter = filter.toUpperCase();
    return filter;
  }

  /**
   * 
   * @param arr Array com os valores
   * @param value valor que deseja retirar
   * @returns retorna um Array sem o value informado
   */
  arrayRemove(arr, value) {

    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  /**
   * 
   * @param int qualquer tipo de variavel, porém deve ser um número
   * @returns um número (String) formatado em real
   */
  formatReal(int) {
    // let tmp = int + '';
    // tmp = tmp.replace(/([0-9]{2})$/g, "$1");
    // if (tmp.length > 6)
    //   tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    // tmp = tmp.replace('.', ',');
    // return tmp;
    int = int.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return int;
  }

  /**
   * 
   * @param arr Array e posição do que deseja somar. EX: 'data.response' || 'data'
   * @param keyObj chave do objeto. EX: '{valor: 1500}, chave = 'valor'
   * @returns valor total dos campos somados
   */
  somaArray(arr: Array<any>, keyObj: string) {
    if (keyObj === '') {
      let soma = 0;
      arr.map((item) => {
        soma += item;
      })
      return soma;
    } else {
      let soma = 0;
      arr.map((item) => {
        soma += item[keyObj];
      })
      return soma;
    }
  }

  /**
   * 
   * @param data recebe uma data yyyy/mm/dd
   * @returns string dd/mm/yyyy
   */
  formataData(data: String) {
    let fullDate = data;
    let yyyy = fullDate.substr(0, 4);
    let mm = fullDate.substr(5, 2);
    let dd = fullDate.substr(8, 2);
    return `${dd}/${mm}/${yyyy}`;
  }

  multiFormataData(data: string, formatoVolta: string) {
    let fullDate = data;
    if (formatoVolta == 'yyyy-mm-dd') {
      let yyyy = fullDate.substr(6, 4);
      let mm = fullDate.substr(3, 2);
      let dd = fullDate.substr(0, 2);
      return `${yyyy}-${mm}-${dd}`;
    } else if (formatoVolta == 'dd/mm/yyyy') {
      let yyyy = fullDate.substr(0, 4);
      let mm = fullDate.substr(5, 2);
      let dd = fullDate.substr(8, 2);
      return `${dd}/${mm}/${yyyy}`;
    } else {
      return;
    }
  }

  /**
  * 
  * @param telefone recebe uma string com número de telefone ou celular
  * @returns uma string formatada utilizando como paramêtro o length da string
  */

  mascaraDeTelefone2(v) {
    v = v.replace(/\D/g, "");             		//Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v.substr(0, 15);
  }

}
