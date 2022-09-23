require('dotenv').config();

const auth = require('./middleware/auth');
const crypto = require('crypto');
const bodyParser = require('body-parser').json();
const md5 = require('md5');
const Parse = require('parse');
Parse.initialize(process.env.DBAPPID, process.env.DBJSKEY);

const APIURL = '/api';
const MD5KEY = process.env.MD5KEY;
const TOKENKEY = process.env.MD5KEY;

module.exports = function(app) {

    app.get(APIURL + '/users', auth, (req, res) => {
        res.json({message:'users'});
        let sql = 'SELECT * FROM users';
        console.log("get users")
        db.query(sql, (err, result, fields) => {
            if (err) throw err;
            
            console.log("get users list")

            return res.status(200).json(result);
        });
    });
    
    app.post(APIURL + '/users/login', bodyParser, async (req, res) => {
        let infoUser = req.body;
  
        try{
            let user = await Parse.User.logIn(infoUser.usernameLogin, infoUser.passwordLogin);
            let head = Buffer.from(
                JSON.stringify({ alg: 'HS256', typ: 'jwt' })
            ).toString('base64');
    
            let body = Buffer.from(JSON.stringify(user)).toString('base64');
    
            let signature = crypto
                .createHmac('SHA256', TOKENKEY)
                .update(head + '.' + body)
                .digest('base64');

            return res.status(200).json({
                id: user.id,
                username: user.username,
                token: `${head}.${body}.${signature}`,
            })
            // res.render('index', { loginMessage: "User logged!", RegisterMessage: '', typeStatus: "success",  infoUser: infoUser });
        } catch (error){
            return res.status(400).json({message: "user not found"});
            // res.render('index', { loginMessage: error.message, RegisterMessage: '', typeStatus: "danger",  infoUser: infoUser});
        }

        // const username = req.body.username;
        // const password = md5(req.body.password + MD5KEY);

        // let sql = 'SELECT * FROM users WHERE username = "' + username + '"';
        // db.query(sql, (err, result, fields) => {
        //     if (err) throw err;

        //     if (result) {
        //         if (result[0].password == password) {
        //             let head = Buffer.from(
        //                 JSON.stringify({ alg: 'HS256', typ: 'jwt' })
        //             ).toString('base64');
            
        //             let body = Buffer.from(JSON.stringify(result[0])).toString('base64');
            
        //             let signature = crypto
        //                 .createHmac('SHA256', TOKENKEY)
        //                 .update(head + '.' + body)
        //                 .digest('base64');

        //             return res.status(200).json({
        //                 id: result[0].id,
        //                 username: result[0].username,
        //                 token: `${head}.${body}.${signature}`,
        //             })
        //         } else {
        //             return res.status(400).json({message: "Incorrect login or password"});
        //         }
        //     } else {
        //         return res.status(400).json({message: "user not found"});
        //     }
        // })
    });

    app.post(APIURL + '/users/signup', bodyParser, (req, res, next) => {
    //     let username = req.body.username;
    //     let password = md5(req.body.password + MD5KEY);
    //     let sql;

    //     // Поиск в БД одиннакового имя пользователя
    //     sql = 'SELECT * FROM users WHERE username = "' + username + '"';
    //     db.query(sql, (err, result, fields) => {
    //         // Остановить, если ошибка
    //         if (err) throw err;
            
    //         if (result.length > 0) {
    //             return res.status(401).json({ message: "User exists"});
    //         } else {
    //             sql = 'INSERT INTO users (username, password, role) VALUES ("' + username + '","' + password + '","User")';
    //             db.query(sql, (err, result, fields) => {
    //                 if (err) throw err;
        
    //                 return res.status(200).json({message: "User created"});
    //             });
    //         }
    //     })
    });

    console.log('api loaded');
};