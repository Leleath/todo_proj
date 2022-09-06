const Routes = function(app, db, jsonParser, md5, md5key) {
    // app.get('/api/users', (req, res) => {
    //     db.collection('users').insertOne({"name": "Nikita", "password": "deodoeod"})
    //     console.log('work')
    // });
    app.get('/api/users', (req, res) => {
        let usersDB = db.collection('users');
        usersDB.find().toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            res.status(200);
        })
    });
    
    app.post('/api/users/login', jsonParser, (req, res) => {
        let usersDB = db.collection('users');
        let login = req.body.name;
        let password = md5(req.body.password + md5key);
        // можно сделать проще, но мне пока сложновато
        usersDB.find({"name": login, "password": password}).toArray((err, result) => {
            if (err) throw err;
            if (result != "") {
                res.json(result);
                res.status(200);
            } else {
                res.json({"status": "Incorrect login or password"});
            }
        })
    });
    
    app.post('/api/users/signin', jsonParser, (req, res) => {
        let login = req.body.name;
        let password = md5(req.body.password + md5key);
        db.collection('users').insertOne({"name": login, "password": password});
        res.status(200);
        res.json({"status": "OK"})
    });
    
    app.post('/api/users/find', jsonParser, (req, res) => {
        let usersDB = db.collection('users');
        usersDB.find({"name": req.body.name}).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            res.status(200);
        });
    });

    // app.post('/api/users/login', (req, res) => {
    //     console.log(req);
    //     //db.collection('users').insertOne({"name": "Vald", "password": "1243"})
    //     res.status(200);
    //     res.send("added")
    // });
};

module.exports = Routes;