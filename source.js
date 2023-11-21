const verificarDataPalindromo = (data) => {

  if (typeof data !== "string") {
    return false;
  }

  const dataArray = data.split("/");

  let concatenacaoDiaMes = dataArray[0] + dataArray[1];//"12" + "02" = "1202"
  let anoInvertido = dataArray[2].split("").reverse().join("");//inverter string "2021" => "1202" 

  let qtdDiasMes = new Date(dataArray[2],dataArray[1],0).getDate();

  if (concatenacaoDiaMes == anoInvertido && dataArray[0] <= qtdDiasMes) {
    return true;
  }

  return false;
};


const procurarProximaDataPalindromo = (ano) =>{

  ano++;// Ir pro proximo ano

  let mes = ano.toString().slice(0, 2).split("").reverse().join("");
  let dia = ano.toString().slice(2, 4).split("").reverse().join(""); // 2025 -> 25

  let segundoDigitoDia = Number(dia.toString().slice(1, 2)) // dia:24 -> 2
  let primeiroDigitoDia = Number(dia.toString().slice(0, 1)) //      24 -> 4


  
  let qtdDiasMes = new Date(ano,mes,0).getDate();// Criar um objeto da classe Date


  if(mes>12){// Validar milenio
    let primeiraLetraMes = Number(mes.toString().slice(0, 1));
    let segundaLetraMes = Number(mes.toString().slice(1, 2));

    primeiraLetraMes=0;
    segundaLetraMes++;
    mes=primeiraLetraMes+""+segundaLetraMes;

    primeiroDigitoDia = 1;
    segundoDigitoDia = 0;

  }else if(Number(dia) > qtdDiasMes){//Validar dia
    primeiroDigitoDia = 0;
    segundoDigitoDia++;
  }


  while(true){


    //ano -> ##X#
    for(let segundoDigito = segundoDigitoDia; segundoDigito <= 9; segundoDigito++){

      //ano -> ###X
      for(let primeiroDigito = primeiroDigitoDia; primeiroDigito <= 3; primeiroDigito++){

        let diaString = (primeiroDigito+""+segundoDigito);

        // Variaveis 12; 02; -> 12/02/2021
        let dataRegex = `${diaString.toString()}/${mes.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0').split("").reverse().join("")+diaString.split("").reverse().join("").padStart(2, '0')}`;

        if(verificarDataPalindromo(dataRegex)) {
          return dataRegex;
        }

      }  

    }

    //Mudar de milenio
    let primeiraLetraMes = Number(mes.toString().slice(0, 1));
    let segundaLetraMes = Number(mes.toString().slice(1, 2));

    if(primeiraLetraMes==0 && (segundaLetraMes == 2 || segundaLetraMes == 1) ){
      primeiraLetraMes=1;
    }else{
      primeiraLetraMes=0;
      segundaLetraMes++;
    }
    mes=primeiraLetraMes.toString()+segundaLetraMes.toString();

    segundoDigitoDia=1;
    primeiroDigitoDia=0;
  }
}

console.log(verificarDataPalindromo("29/02/2092"));
console.log(procurarProximaDataPalindromo("2093"));
