const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;

var db

MongoClient.connect('mongodb://pandah3:testing@ds245518.mlab.com:45518/travel-log', (err, client) => {
  if (err) return console.log(err);
  db = client.db('travel-log');
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {entries: result})
  })
})

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/')
  })
})

app.put('/entries', (req, res) => {
  db.collection('entries')
  .findOneAndUpdate({}, {
    $set: {date: req.body.date}
  },{
    sort: {_id: -1},
    upsert: true}, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/entries/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  db.collection('entries')
  .findOneAndDelete({'_id': ObjectId(id)},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'Country got deleted'})
  })
});
