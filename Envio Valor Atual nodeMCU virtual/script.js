let valor_recebido_mpu01
let valor_mpu_01

document.getElementById("botao-envio").addEventListener("click",EnviarUbidots)
document.getElementById("botao-receber").addEventListener("click",ReceberUbidotsMPU1)

function ReceberUbidotsMPU1() {

const Http = new XMLHttpRequest()
const token = "BBFF-5zcBruZbdvVyGO4YswaqzubqY8QbC1";//Token do usuário no Ubidots
var url1 = "https://industrial.api.ubidots.com/api/v1.6/devices/node-mcu-virtual/mpu_01_ubdts/lv" 

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

function EnviarUbidots() {

  const Http = new XMLHttpRequest();
  const token = "BBFF-5zcBruZbdvVyGO4YswaqzubqY8QbC1"; //Token do usuário no Ubidots
  var url = "https://industrial.api.ubidots.com/api/v1.6/devices/valores-atuais-nodemcu";//localiza em que dispositivo serão criadas as variéveis
  console.log(`O valor do MPU 01 atual é :${valor_recebido_mpu01}`)
  
  valor_mpu_01 = valor_recebido_mpu01 //valor do botão digitado na página
  
  var dado = '{"angulo_01":' + valor_mpu_01 + '}'; // [VARIAVEIS CRIADAS NO UBIDIDOTS PELO JS] ==> entre aspas duplas = chave, entre os '+' = valor(armazenado na variável) 
  
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
