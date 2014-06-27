var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

/* GET home page. */
router.get('/', function(req, res) {
//    var sequelize = new Sequelize('test', 'root', 'tbd');
//    var User = sequelize.define('User', {
//        username: Sequelize.STRING,
//        birthday: Sequelize.DATE
//    })
//
//    sequelize.sync().success(function() {
//        User.create({
//            username: 'sdepold',
//            birthday: new Date(1986, 06, 28)
//        }).success(function(sdepold) {
            res.render('index', { body: 'Express' ,title : 'Hello' });
//        })
//    })

});
router.get('/famous', function(req, res) {
    res.render('./famous/famous.ejs');
});


module.exports = router;
