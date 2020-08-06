const express = require('express');

const app = express();
const path = require('path');
const hbs = require('express-handlebars');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },

  filename: function (req, file, cb) {
    now = Date.now().toString();
    newFilename = `${now}${file.originalname}`;
    cb(null, newFilename.replace(/ /g,''));
  },
});

const upload = multer({
  storage: storage
});

app.engine('hbs', hbs({
  extname: 'hbs',
  layoutsDir: './layouts',
  defaultLayout: 'main'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({
  extended: false
}));

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
  res.render('history', {
    layout: 'dark'
  });
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {
    name: req.params.name
  });
});


app.post('/contact/send-message', upload.single('image'), (req, res, cb) => {

  const {
    author,
    sender,
    title,
    message,
  } = req.body;

  const {
    originalname,
    filename
  } = req.file;


  if (author && sender && title && message && originalname) {
    res.render('contact', {
      isSent: true,
      imgName: originalname,
      fileName: `/${filename}`,
    });
  } else {
    res.render('contact', {
      isError: true
    });
  };
});

app.use(express.static(path.join(__dirname, '/public')));


app.use((req, res) => {
  res.status(404).render('404', {
    layout: 'dark'
  });;
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});