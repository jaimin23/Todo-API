var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mangoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((result)=>{
        res.send(result);
    }, (error) =>{
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) =>{

    Todo.find().then((todos) =>{
        res.send({todos});
    }, (error) =>{
        res.status(400).send(error);
    })
})

app.get('/todos/:id', (req, res) =>{
    
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)){
        res.status(404).send({
            error: 'Not a valid Id'
        })
    }
    Todo.findById(id).then((todo) =>{
        if(!todo){
            res.status(404).send('Todo not found');
        }
        res.send({todo});
    }).catch((error) =>{
        res.status(400).send(error);
    })
});



module.exports = {app};
app.listen(port, () =>{
    console.log(`Application started on port ${port}`);
})