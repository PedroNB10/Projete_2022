let valor_recebido_mpu01,valor_recebido_mpu02
let valor_mpu_01, valor_mpu_02

function EnviarUbidots() {

const Http = new XMLHttpRequest();
const token = "BBFF-5zcBruZbdvVyGO4YswaqzubqY8QbC1"; //Token do usuário no Ubidots
var url = "https://industrial.api.ubidots.com/api/v1.6/devices/valores-atuais-nodemcu";//localiza em que dispositivo serão criadas as variéveis
console.log(`O valor do MPU 01 atual é :${valor_recebido_mpu01}`)
console.log(`O valor do MPU 02 atual é :${valor_recebido_mpu02}`)

valor_mpu_01 = valor_recebido_mpu01 //valor do botão digitado na página
valor_mpu_02 = valor_recebido_mpu02//valor do sensor de umidade digitado na página

var dado = '{"angulo_01":' + valor_mpu_01 + ',' + '"angulo_02":' + valor_mpu_02 + '}'; // [VARIAVEIS CRIADAS NO UBIDIDOTS PELO JS] ==> entre aspas duplas = chave, entre os '+' = valor(armazenado na variável) 

//console.log(dado); //mostra a variavel dado no console 

document.getElementById("resposta_de_envio").innerHTML = "" //Limpa o status que está na página, insere o " ", ou seja sem dados

    if(valor_mpu_01!=""|| valor_mpu_02!="")//Só envia caso estiver algum valor for digitado nos campos de entrada do botão e do sensor de umidade
    {
      Http.open("POST", url);//Para enviar usa-se o POST do HTTP
      Http.setRequestHeader("X-Auth-Token", token);//Autenticação no cabeçalho (header)
      Http.setRequestHeader("Content-Type", "application/json");//Tipo de conteúdo enviado é JSON!
      Http.send(dado) //Envia a requisição POST
      Http.onreadystatechange = function() {//Verifica o status do envio

          if(Http.readyState == XMLHttpRequest.DONE)//Está pronto para fazer a requisição, permite fazer requisição no javascript
          {
                var resposta_botao = Http.responseText//variavel onde armazena o estado da requisição

              if(resposta_botao.includes("201"))//Resposta tem o texto 201? Sim: Ubidots aceitou dado
              {
                document.getElementById("resposta_de_envio").innerHTML = "Enviado com sucesso!";//The innerHTML property sets or returns the HTML content (inner HTML) of an element.
              }

              else{
                document.getElementById("resposta_de_envio").innerHTML = "Erro ao enviar!"
              }
        }

      }
    }

    else// Os campos de entrada estão vazios
    {
        alert("Certifique-se que você preencheu os campos dos valores desejados para envio!")//mostrao o alerta caso não tenha sido digitado valor na página
    }
}

function ReceberUbidotsMPU1() {

const Http = new XMLHttpRequest()
const token = "BBFF-5zcBruZbdvVyGO4YswaqzubqY8QbC1";//Token do usuário no Ubidots
var url1 = "https://industrial.api.ubidots.com/api/v1.6/devices/node-mcu-virtual/mpu_01_ubdts/lv" 
//document.getElementById("resposta_de_recepcao1").innerHTML = "";//Limpa o status que está na página
//document.getElementById("estado_aquecedor").innerHTML = "";//Limpa o status que está na página

  dado1="";
  Http.open("GET", url1);//Para receber usa-se o GET do HTTP
  Http.setRequestHeader("X-Auth-Token", token);//Autenticação no cabeçalho (header)
  Http.setRequestHeader("Content-Type", "application/json")//Tipo de conteúdo enviado é JSON!
  Http.send(dado1)  //Envia a requisição post
  Http.onreadystatechange = function() {//Verifica o status do envio
  
  	if(Http.readyState == XMLHttpRequest.DONE)//Pronto para receber informação?
  	{
    		console.log(Http.responseText)               //Mostra no console a resposta
    		

        document.getElementById("estado_aquecedor").innerHTML = "Valor do MPU 01:"
        document.getElementById("resposta_de_recepcao1").innerHTML = Http.responseText    
        valor_recebido_mpu01 = Http.responseText//variavel onde armazena o estado de recepção 
    }
  }
  

}

function ReceberUbidotsMPU2() {

const Http = new XMLHttpRequest();
const token = "BBFF-5zcBruZbdvVyGO4YswaqzubqY8QbC1";    //Token do usuário no Ubidots
var url2 = "https://industrial.api.ubidots.com/api/v1.6/devices/node-mcu-virtual/mpu_02_ubdts/lv" ;//localiza qual a variavel que será lida do ubidots
//document.getElementById("estado_led").innerHTML = "";   //Limpa o status que está na página
//document.getElementById("resposta_de_recepcao2").innerHTML = "";   //Limpa o status que está na página
  dado2="";
  Http.open("GET", url2);                             //Para enviar usa-se o POST do HTTP
  Http.setRequestHeader("X-Auth-Token", token);       //Autenticação no cabeçalho (header)
  Http.setRequestHeader("Content-Type", "application/json");  //Tipo de conteúdo enviado é JSON!
  Http.send(dado2)  //Envia a requisição post
  Http.onreadystatechange = function() {              //Verifica o status do envio
  
      if(Http.readyState == XMLHttpRequest.DONE)       //Pronto?
      {
                         //Mostra no console a resposta
             
            
            document.getElementById("estado_led").innerHTML = "Enviado com sucesso!";
            document.getElementById("resposta_de_recepcao2").innerHTML = Http.responseText;

           
            document.getElementById("estado_led").innerHTML = "Valor do MPU 02: ";
            document.getElementById("resposta_de_recepcao2").innerHTML = Http.responseText;
            
            valor_recebido_mpu02 = Http.responseText;
            
            
      }

     
  }

 

}
