const verificarDataPalindromo = (data) => {

  if (typeof data !== "string") {
    return false;
  }

  const dataArray = data.split("/");

  let concatenacaoDiaMes = dataArray[0] + dataArray[1];//"12" + "02" = "1202"
  let anoInvertido = dataArray[2].split("").reverse().join("");//inverter string "2021" => "1202" 

  let qtdDiasMes = new Date(dataArray[2], dataArray[1], 0).getDate();

  if (concatenacaoDiaMes == anoInvertido && (dataArray[0] <= qtdDiasMes && dataArray[0] != 0) && (dataArray[1] <= 12 && dataArray[1] != 0)) {
    return true;
  }

  return false;
};


const procurarProximaDataPalindromo = (data) => {

  const dataArray = data.split("/");//  dataArray[0] = dia dataArray[1] = mes dataArray[2] = ano

  /*
  for (d of dataArray) {
    console.log(d);
  }

  console.log("===============");
  */

  let ano = dataArray[2].toString();     //0001
  let ultimoDiaAno = Number(dataArray[2].toString().slice(3, 4)) + 1;

  ano = dataArray[2].toString().slice(0, 3) + ultimoDiaAno.toString();
  //console.log(ano.toString());

  let mes = ano.toString().slice(0, 2).split("").reverse().join("");
  let dia = ano.toString().slice(2, 4).split("").reverse().join(""); // 2025 -> 25

  let segundoDigitoDia = Number(dia.toString().slice(1, 2)) // dia:24 -> 2
  let primeiroDigitoDia = Number(dia.toString().slice(0, 1)) //      24 -> 4



  let qtdDiasMes = new Date(ano, mes, 0).getDate();// Criar um objeto da classe Date

  if (Number(dia) > qtdDiasMes) {//Validar dia
    primeiroDigitoDia = 1;
    segundoDigitoDia++;
  }

  while (true) {

    //ano -> ##X#
    for (let segundoDigito = segundoDigitoDia; segundoDigito <= 9; segundoDigito++) {

      //ano -> ###X
      for (let primeiroDigito = primeiroDigitoDia; primeiroDigito <= 3; primeiroDigito++) {

        let diaString = (primeiroDigito + "" + segundoDigito);


        // Variaveis 12; 02; -> 12/02/2021
        let dataRegex = `${diaString.toString()}/${mes.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0').split("").reverse().join("") + diaString.split("").reverse().join("").padStart(2, '0')}`;
        //console.log("DEBUG >:"+dataRegex);
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


    mes = primeiraLetraMes.toString() + segundaLetraMes.toString();

    segundoDigitoDia = 0;
    primeiroDigitoDia = 1;

  }
}

/*
var valor = "01/01/5000";
for(i = 0; i < 200; i++){
  valor = procurarProximaDataPalindromo(valor);
  console.log(valor);
}
*/

export const handler = async (event) => {

  let msg1 = "";
  if(verificarDataPalindromo(event.data)){
    msg1 = "Data Válida";
  }else{
    msg1 = "Data não Válida"
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(msg1+"\n"+procurarProximaDataPalindromo(event.data)),
  };
  return response;
};
