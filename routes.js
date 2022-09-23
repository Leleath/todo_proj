require('dotenv').config();

const auth = require('./middleware/auth');
const crypto = require('crypto');
const bodyParser = require('body-parser').json();
const md5 = require('md5');
const Parse = require('parse/node');
Parse.initialize(process.env.DBAPPID, process.env.DBJSKEY);

const APIURL = '/api';
const MD5KEY = process.env.MD5KEY;
const TOKENKEY = process.env.MD5KEY;

module.exports = function(app) {

    app.get(APIURL + '/users', auth, (req, res) => {
        res.json({message:'users'});
        // let sql = 'SELECT * FROM users';
        // console.log("get users")
        // db.query(sql, (err, result, fields) => {
        //     if (err) throw err;
            
        //     console.log("get users list")

        //     return res.status(200).json(result);
        // });
    });
    
    app.post(APIURL + '/users/login', bodyParser, async (req, res) => {
        let infoUser = req.body;
  
        try{
            let user = await Parse.User.logIn(infoUser.username, infoUser.password);
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
        } catch (error){
            return res.status(400).json({message: "user not found"});
        }
    });

    app.post(APIURL + '/users/signup', bodyParser, async (req, res, next) => {
        let infoUser = req.body;    
        let user = new Parse.User();
      
        user.set("username", infoUser.username);
        user.set("password", infoUser.password);

        try{
            await user.signUp();
            res.status(200).json({message: "User created"});
        } catch (error) {
            res.status(400).json({message: "error"})
        }
    });

    console.log('api loaded');
};