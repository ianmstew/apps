var express = require('express');
 
var app = express();
 
app.configure(function () {
  // 'default', 'short', 'tiny', 'dev'
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express['static'](__dirname + '/../client-build'));
});
 
app.listen(3000);
console.log('Listening on port 3000...');
