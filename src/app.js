const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacoes = require('./util/cotacao');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotações',
        author: 'Washington Carlos de Aquino'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Washington Carlos de Aquino'
    });
});

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        const error = {
            mensage: 'o ATIVO deve ser informado'
        }
        return res.send(error);
    }
    const symbol = req.query.ativo.toUpperCase();
    cotacoes(symbol, (err, body) => {
        if (err) {
            return res.status(err.code).json({
                error: {
                    mensage: err.mensage,
                    code: err.code
                }
            });
        }
        console.log(body);
        res.status(200).json(body);
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'ajuda',
        author: 'Washington Carlos de Aquino'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'não existe pagina apos o /help'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Pagina não encontrada'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});

oi;