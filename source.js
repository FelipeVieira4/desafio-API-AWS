

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


const procurarProximaDataPalindromo = (data) =>{
  const dataArray = data.split("/");// separar string data em array [0] = dia,[1] = mês e [2] = ano

  let ano = Number(dataArray[2]);

  ano++;// começar pelo proxímo ano

  //Último ano válido
  while (ano<9000){

    let mes = Number(ano.toString().slice(0, 2).split("").reverse().join(""));
    let dia = Number(ano.toString().slice(2, 4).split("").reverse().join(""));

    let qtdDiasMes = new Date(ano,mes,0).getDate();

    if( ( (dia > 0 && dia <= qtdDiasMes) || dia == 22) && mes <= 12){

      let dataRegex = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

      if (verificarDataPalindromo(dataRegex)) {
        return dataRegex;
      }

    }

    ano++;
  }

  return "PASSOU DA ULTIMA DATA PALINDROMO VÁLIDA";
}

verificarDataPalindromo("12/02/2021");
console.log(procurarProximaDataPalindromo("12/02/2012"));
