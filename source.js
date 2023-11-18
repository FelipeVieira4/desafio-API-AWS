

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
  const dataArray = data.split("/");

  let ano = Number(dataArray[2]);
  ano++;
  while (true) {
    let mes = Number(ano.toString().slice(0, 2).split("").reverse().join(""));
    let dia = Number(ano.toString().slice(2, 4).split("").reverse().join(""));

    if(dia>=13){
      dia=1;
      mes++;
    }

    let dataRegex = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

    if (verificarDataPalindromo(dataRegex)) {
      return dataRegex;
    }

    ano++;
  }
}

verificarDataPalindromo("12/02/2021");
console.log(procurarDataPalindromo("12/02/2021"));
