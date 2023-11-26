
/*Função para verificar se a data é um palíndromo*/
const verificarDataPalindromo = (data) => {

  if (typeof data !== "string") {
    return false;
  }

  const dataArray = data.split("/");//  dataArray[0] = dia dataArray[1] = mes dataArray[2] = ano

  let concatenacaoDiaMes = dataArray[0].padStart(2, '0') + dataArray[1].padStart(2, '0');//"12" + "02" = "1202"
  let anoInvertido = dataArray[2].split("").reverse().join("").padStart(2, '0');//inverter string "2021" => "1202" 

  let qtdDiasMes = new Date(dataArray[2], dataArray[1], 0).getDate();

  if (concatenacaoDiaMes == anoInvertido && (dataArray[0] <= qtdDiasMes && dataArray[0] != 0) && (dataArray[1] <= 12 && dataArray[1] != 0)) {
    return true;
  }

  return false;
};

/*Função para procurar proxima data palindromo*/

const procurarProximaDataPalindromo = (data) => {

  const dataArray = data.split("/");  //  dataArray[0] = dia dataArray[1] = mes dataArray[2] = ano

  if(dataArray.length != 3){
    return "ERRO";
  }

  let ano = dataArray[2].toString().padStart(4, '0');

  //Incrementar mais um ano a string
  let ultimoDiaAno = Number(dataArray[2].toString().slice(3, 4))+1;
  ano = dataArray[2].toString().slice(0, 3) + (ultimoDiaAno).toString();

  let mes = ano.toString().slice(0, 2).split("").reverse().join("");
  let dia = ano.toString().slice(2, 4).split("").reverse().join(""); // 2025 -> 25

  let segundoDigitoDia = Number(dia.toString().slice(1, 2)) // dia:24 -> 2
  let primeiroDigitoDia = Number(dia.toString().slice(0, 1)) //      24 -> 4

  let qtdDiasMes = new Date(ano, mes, 0).getDate();// Criar um objeto da classe Date para pegar qu

  //Valídar dia
  if (Number(dia) > qtdDiasMes) {
    primeiroDigitoDia = 0;
    segundoDigitoDia++;
  }

  //console.log(primeiroDigitoDia+""+segundoDigitoDia);
  //console.log(ano);

  while (Number(ano) <= 9092) {

    //ano -> ##X# pegar penultimo número do ano 
    for (let segundoDigito = segundoDigitoDia; segundoDigito <= 9; segundoDigito++) {

      //ano -> ###X pegar último número do ano 
      for (let primeiroDigito = primeiroDigitoDia; primeiroDigito <= 3; primeiroDigito++) {

        let diaString = (primeiroDigito + "" + segundoDigito); //concatenar os valores para gerar o dia em String

        // Variáveis 12; 02; -> 12/02/2021
        let dataRegex = `${diaString.toString()}/${mes.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0').split("").reverse().join("") + diaString.split("").reverse().join("").padStart(2, '0')}`;
        ano = `${mes.toString().padStart(2, '0').split("").reverse().join("") + diaString.split("").reverse().join("").padStart(2, '0')}`;
        //console.log("(DEBUG):"+dataRegex);
        if (verificarDataPalindromo(dataRegex)) {
          return dataRegex;
        }

      }

    }

    //Mudar de milenio
    let primeiraLetraMes = Number(mes.toString().slice(0, 1));
    let segundaLetraMes = Number(mes.toString().slice(1, 2));

    if (primeiraLetraMes == 0 && (segundaLetraMes == 2 || segundaLetraMes == 1)) {
      primeiraLetraMes = 1;
    } else {
      primeiraLetraMes = 0;
      segundaLetraMes++;
    }


    mes = primeiraLetraMes.toString() +""+ segundaLetraMes.toString();

    segundoDigitoDia = 0;
    primeiroDigitoDia = 1;

    console.log(ano);
  }

  return "Não há mais data políndroma depois dessa";
}

//console.log(procurarProximaDataPalindromo("06/03/1992"));
//console.log(verificarDataPalindromo("2/2/2020"));



export const handler = async (event) => {
  let data=event.data;

  let valida = verificarDataPalindromo(data)?"Válida":"Inválida";

  const response = {
    statusCode: 200,
    body: JSON.stringify(`Essa data é ${valida}`),
    proximaData:JSON.stringify(procurarProximaDataPalindromo(data)),
  };
  return response;
};
