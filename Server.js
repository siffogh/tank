var express = require('express');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Main page
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// custom 404 page
app.use((req, res, next) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('Express started on http://localhost:' + app.get('port'));
});


/*
   /\      /     /\      \      /
  /  \    /     /  \      \     \/
 /    \  /      \  /      /\     \
/      \/        \/       \/      \/
*/
