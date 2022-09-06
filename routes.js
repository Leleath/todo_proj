const Routes = function(app, db) {
    // app.get('/api/users', (req, res) => {
    //     db.collection('users').insertOne({"name": "Nikita", "password": "deodoeod"})
    //     console.log('work')
    // });
    app.get('/api/users', (req, res) => {
        let usersDB = db.collection('users');
        usersDB.find().toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
    });
};

module.exports = Routes;