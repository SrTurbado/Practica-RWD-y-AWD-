const express = require('express');
const useragent = require('express-useragent');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());

// Fase 2: RWD - Entrega estricta de un único archivo HTML para todos
app.get('/responsive', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'responsive.html'));
});

// Fase 3: AWD - Renderizado condicional en servidor
app.get('/adaptive', (req, res) => {
    if (req.useragent.isMobile) {
        res.render('mobile'); // Envía un DOM reducido
    } else {
        res.render('desktop'); // Envía el DOM completo
    }
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));