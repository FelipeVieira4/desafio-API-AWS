

const dataPalindroma = (data) => {
  if (typeof data !== "string") {
    return "ERRO";
  }

  console.log(data);

  const dataArray = data.split("/");

  let concatenaDiaMes = dataArray[0] + dataArray[1];//"12" + "02" = "1202"
  let anoInvertido = dataArray[2].split("").reverse().join("");//inverter string "2021" => "1202" 

  if (concatenaDiaMes == anoInvertido) {
    console.log("É um palíndromo!");
  } else {
    console.log("Não é um palíndromo.");
  }

};

dataPalindroma("12/03/4021");
