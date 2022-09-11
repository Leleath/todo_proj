module.exports = function(app, db, bodyParser, md5, md5key) {
    const APIURL = '/api';

    // api middleware
    // app.use((req, res, next) => {
    //     req.headers['From-Middleware'] = 1;
    //     next();
    // })

    app.get(APIURL + '/users', (req, res) => {
        let sql = 'SELECT * from users';

        db.query(sql, (err, result, fields) => {
            let users = [];
            for (let i in result) {
                users.push(result[i].username);
            }
            res.json(users)
        });
    });
    
    app.post(APIURL + '/users/find', bodyParser, (req, res) => {
        // let usersDB = db.collection('users');
        // usersDB.find({"name": req.body.name}).toArray((err, result) => {
        //     if (err) throw err;
        //     res.json(result);
        //     res.status(200);
        // });
    });
    
    app.post(APIURL + '/users/login', bodyParser, (req, res) => {
        let username = req.body.username;
        let password = md5(req.body.password + md5key);

        let sql = 'SELECT password FROM users WHERE username = "' + username + '"';
        db.query(sql, (err, result, fields) => {
            if (err) throw err;
            if (result[0].password == password) {
                res.json({"status": "OK"});
                res.status(200);
            } else {
                res.json({"status": "Incorrect login or password"});
                res.status(200);
            }
        })
    });
    
    // ADMIN API
    app.post(APIURL + '/admin/users/create', bodyParser, (req, res) => {
        let username = req.body.username;
        let password = md5(req.body.password + md5key);

        if (username != undefined) {
            let sql = 'INSERT INTO users (username, password) VALUES ("' + username + '","' + password + '")';
            db.query(sql, (err, result, fields) => {
                if (err) throw err;
    
                res.json({"status": "OK"});
                res.status(200);
            })
        } else {
            res.json({"status": "error"})
        }
    });

    app.post(APIURL + '/admin/users/delete', bodyParser, (req, res) => {
        let login = req.body.login;
        let password = md5(req.body.password);
        let sql = 'DELETE FROM users WHERE login = "' + login + '"';
        db.query(sql, (err, result, fields) => {
            if (err) throw err;

            res.json({"status": "OK"});
            res.status(200);
        })
    })

    // app.post('/api/users/login', (req, res) => {
    //     console.log(req);
    //     //db.collection('users').insertOne({"name": "Vald", "password": "1243"})
    //     res.status(200);
    //     res.send("added")
    // });

    console.log('api loaded');
};