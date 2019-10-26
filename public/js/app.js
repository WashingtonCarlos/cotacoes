console.log('javascript no frontend');


const cotacoesForm = document.querySelector('form');
const h3 = document.querySelector('h3');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    h3.innerText = 'Buscando...';
    event.preventDefault();
    const ativo = document.querySelector('input').value;
    if (!ativo) {
        h3.innerText = 'Ativo deve ser informado !!!';
        return;
    }
    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                h3.innerText = 'alguma coisa deu errado ';
                price.innerText = `${data.error.mensage} | codigo ${data.error.code}`;
            } else {
                h3.innerText = data.symbol;
                price.innerText = data.price;
                price_open.innerText = data.price_open;
                day_high.innerText = data.day_high;
                day_low.innerText = data.day_low;
            }
        });
    });
});