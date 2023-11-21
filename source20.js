const verificarDataPalindromo = (data) => {

  if (typeof data !== "string") {
    return false;
  }

  const dataArray = data.split("/");

  let concatenacaoDiaMes = dataArray[0] + dataArray[1];//"12" + "02" = "1202"
  let anoInvertido = dataArray[2].split("").reverse().join("");//inverter string "2021" => "1202" 

  let qtdDiasMes = new Date(dataArray[2],dataArray[1],0).getDate();

  console.log(qtdDiasMes);
  if (concatenacaoDiaMes == anoInvertido && dataArray[0] <= qtdDiasMes) {
    return true;
  }

  return false;
};


const procurarProximaDataPalindromo = (ano) =>{

  ano++;

  let mes =(ano.toString().slice(0, 2).split("").reverse().join(""));
  let dia = ano.toString().slice(2, 4); // 2025 -> 25

  let segundoDigitoDia = Number(dia.toString().slice(0, 1)) // dia:24 -> 2
  let primeiroDigitoDia = Number(dia.toString().slice(1, 2)) //      24 -> 4


  
  let qtdDiasMes = new Date(ano,mes,0).getDate();

  if(Number(dia.split("").reverse().join("")) > qtdDiasMes){
    primeiroDigitoDia = 0;
    segundoDigitoDia++;
  }

  console.log(primeiroDigitoDia+""+segundoDigitoDia);
  while(true){


    //##X#
    for(let segundoDigito = segundoDigitoDia; segundoDigito <= 9; segundoDigito++){

      //###X
      for(let primeiroDigito = primeiroDigitoDia; primeiroDigito <= 3; primeiroDigito++){

        let diaString = (primeiroDigito+""+segundoDigito);

        // 02/02/0202 -> 02/02/2020 -> inverte o dia
        let dataRegex = `${diaString.toString()}/${mes.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0').split("").reverse().join("")+diaString.split("").reverse().join("").padStart(2, '0')}`;


        if(verificarDataPalindromo(dataRegex)) {
          return dataRegex;
        }

      }  

    }


    //console.log("Não erra para isso aparecer!!");
    
    let primeiraLetraMes = Number(mes.toString().slice(0, 1).padStart(2, '0'));

    if(primeiraLetraMes > 3 && (mes.toString().slice(1, 2)) != 0)mes+=1;
    else mes+=10;
    
    segundoDigito=0;
    primeiroDigitoDia=0;
  }
}

console.log(procurarProximaDataPalindromo("2012"));
