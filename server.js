const express = require('express');

const app = express();
const path = require('path');
const hbs = require('express-handlebars');

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history', {layout: 'dark'});
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name });
});

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).render('404', {layout: 'dark'});;
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
