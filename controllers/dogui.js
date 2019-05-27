 const router = require('express').Router();
 const bodyparser = require('body-parser');
 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');

 // Load User Model
require('../model/User');
const User = mongoose.model('employee');

 // connect to  the database
mongoose.connect('mongodb+srv://neo:Lwahndeele1@cluster0-myfbr.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
})
.then(()=> console.log('MongoDB is now connected'))
.catch(err =>console.log(err));


     
    router.get('/register', (req, res)=>{
        res.render('register');
    })

    router.post('/register', function(req, res){

        let errors = [];
        
        if(req.body.idno != req.body.Ridno){
           errors.push({msg: 'ID no must match'});
           res.redirect('/users/register');
        }
        if(req.body.idno.length !== 13){
           errors.push({msg:'ID no must be at least 13 characters'});
           res.redirect('/users/register');
        }
        if(errors.length > 0){
            res.render('/users/register', {
                errors: errors,
                username: req.body.username,
                lastName: req.body.lastName,
                email: req.body.email,
                idno: req.body.idno,
                Ridno: req.body.Ridno
            });
        }else {
            User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    res.redirect('/users/register');
                }else{
    
            const newUser = new User({
                username: req.body.username,
                lastName: req.body.lastName,
                email: req.body.email,
                idno: req.body.idno
            });
    
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.idno, salt, (err, hash) =>{
                   
                    newUser.idno = hash;
                    newUser.save()
                    .then(user => {
                        res.redirect('seeuser');
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    });
                });
            });
                }
            });
        }
    });
    //get employee
    router.get('/seeuser', (req, res)=>{
        User.find({})
        .then(user =>{
            res.render('seeuser', {
                data: user
            });
        });
    });

   
    router.get('/edit/:id', (req, res)=>{
        User.findOne({_id: req.params.id})
        .then(user =>{
            res.render('edit', {
                data: user
            });
        });
    });

    router.put('/:id', (req, res)=>{
        User.findOne({_id: req.params.id}).then(updaterUser =>{
            updaterUser.username =  req.body.username,
            updaterUser.lastName =  req.body.lastName
            updaterUser.save().then(update =>{
                res.redirect('/users/seeuser');
            })

        })
    });
    router.delete('/:id', (req, res)=>{
        User.remove({_id: req.params.id})
        .then(()=>{
            res.redirect('/users/seeuser');
        });
    });

module.exports = router;