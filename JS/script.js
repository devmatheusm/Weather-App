//CHAVE DA API
import { API_KEY as KEY} from '../KEY.js';

//CONSTANTES DE OUTPUT
const cidade = document.getElementById('cidadeNome');
const flag = document.getElementById('cidadeFlag');
const temp = document.getElementById('temperatura');
const clima = document.getElementById('clima');
const climaIcon = document.getElementById('climaIcon');
const umidade = document.getElementById('umidade');
const vento = document.getElementById('vento');
const pressao = document.getElementById('pressao');
const informacao = document.getElementById('info');
const content = document.querySelectorAll('#info .content,.subContent');

//CONSTANTES INPUT
const btn = document.getElementById('btn');
const input = document.getElementById('search');
const hint = document.getElementById('hint');
const loading = document.getElementById('load');

//INICIALIZAÇÃO DE CLASSES
informacao.classList.add('none');
content.forEach(cont => cont.classList.add('hide')) 



//PEGA AS INFORMAÇÕES DA API E CONVERTE PRO FORMATO JSON
const getData = async (inputCidade) => {
    const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${inputCidade}&appid=${KEY}&units=metric&lang=pt_br`;

    const result = await fetch(API_WEATHER);
    const data = await result.json();
    return data;
};

//ORGANIZA AS INFORMAÇÕES DENTRO DOS ELEMENTOS DO CARD
const sortData = async (inputCidade) =>{
    const data = await getData(inputCidade);   
    
    //VERIFICA SE ESTA DANDO ERRO
    if(data.cod == "404"){
        hint.classList.remove('none');
        loading.classList.remove('loading');
        throw hint.innerText = "Cidade não encontrada"
    }

    //VERIFICAÇÃO DA CHAVE DA API
    if(data.cod == "401"){
        hint.classList.remove('none');
        loading.classList.remove('loading');
        hint.innerText = "Chave da API invalida";
    }
    
    const API_ICON_WEATHER = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const API_FLAG = `https://www.countryflagicons.com/FLAT/32/${data.sys.country}.png`

    cidade.innerHTML = data.name;
    flag.src = API_FLAG;

    temp.innerHTML = `${parseInt(data.main.temp)}°C`;

    climaIcon.src = API_ICON_WEATHER;
    clima.innerHTML = data.weather[0].description;

    umidade.innerHTML = `${data.main.humidity}%`;
    vento.innerHTML = `${data.wind.speed} m/s`;
    pressao.innerHTML = `${data.main.pressure} hPa`;
};

//VALIDA SE O INPUT ESTA VAZIO
const validation = () => {
    if(input.value.toString().trim() != "")
        return true;
    else
        return false;
};

//EVENTO DO BOTÃO "SEARCH"
//QUANDO O BOTÃO FOR CLICADO SERA EXECUTADO AS FUNÇÕES ANTERIORES + ANIMAÇÕES
btn.addEventListener('click', () => {
    if(validation()){
        loading.classList.add('loading');
        sortData(input.value).then(() => {
            informacao.classList.remove('none');
            informacao.classList.add('animCard');
            hint.classList.add('none');

            content.forEach(cont => {
                cont.classList.add('animText');
            });

            loading.classList.remove('loading');
        });
    }
    else{
        hint.classList.remove('none');
        hint.innerText = "Escreva uma cidade";
    }
});