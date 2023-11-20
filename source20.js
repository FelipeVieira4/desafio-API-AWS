const verificarDataPalindromo = (data) => {

  if (typeof data !== "string") {
    return false;
  }

  const dataArray = data.split("/");

  let concatenacaoDiaMes = dataArray[0] + dataArray[1];//"12" + "02" = "1202"
  let anoInvertido = dataArray[2].split("").reverse().join("");//inverter string "2021" => "1202" 

  if (concatenacaoDiaMes == anoInvertido) {
    return true;
  }

  return false;
};


const procurarProximaDataPalindromo = (ano) =>{

  let mes = Number(ano.toString().slice(0, 2).split("").reverse().join(""));
  let dia = Number(ano.toString().slice(2, 4)); // 2025 -> 25

  let segundoDigitoDia = Number(dia.toString().slice(0, 1)) // dia:24 -> 2
  let primeiroDigitoDia = Number(dia.toString().slice(1, 2)) //      24 -> 4

  let qtdDiasMes = new Date(ano,mes,0).getDate();

  if(primeiroDigitoDia > 3){
    primeiroDigitoDia = 0;
    segundoDigitoDia++;
  }

  
  console.log(segundoDigitoDia+""+primeiroDigitoDia);
  
  
  //##X#
  for(let segundoDigito = segundoDigitoDia; segundoDigito < 9; segundoDigito++){

    //###X
    for(let primeiroDigito = primeiroDigitoDia; primeiroDigito <= 3; primeiroDigito++){

      let diaString = (primeiroDigito+""+segundoDigito);

      // 02/02/0202 -> 02/02/2020 -> inverte o dia
      let dataRegex = `${diaString.toString()}/${mes.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0').split("").reverse().join("")+diaString.split("").reverse().join("").padStart(2, '0')}`;

      console.log(dataRegex);

      /*
      qtdDiasMes = new Date(mes.toString().padStart(2, '0').split("").reverse().join("")+diaString,mes.toString().padStart(2, '0'),0).getDate();
      */

      if (verificarDataPalindromo(dataRegex)) {
        return dataRegex;
      }

    }  

  }
  
}

console.log(procurarProximaDataPalindromo(2013));