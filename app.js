var express = require("express");
var cors = require("cors");
var app = express();
var router = express.Router();
var request = require('request');
var moment = require("moment");
var port = 3020;


var safesitelist = ['www.dhlottery.co.kr'];

var corsOptions = {
    origin: function(origin, callback) {
        var issafesitelisted = safesitelist.indexOf(origin) !== -1;
        callback(null, issafesitelisted);
    },
    credentials: true
}

//cors설정
app.use(cors(corsOptions));

/* GET home page. */
app.get('/', function(req, res, next) {
	res.render('index.ejs', { title: 'Express' });
});

app.get('/lottos/last', (req, res) => {

  let week = getWeek();

	request.get({uri:"https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+week, strictSSL: false}, 
	(error, response, body) => {
		// console.log(error);
		res.json(JSON.parse(body));
	});

});

app.get('/lottos/:id', (req, res) => {
	request.get({uri:"https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+req.params.id, strictSSL: false},
	(error, response, body) => {
		res.json(JSON.parse(body));

	});
})

app.get('/documents/:id', (req,res) => {
	res.json({id: req.params.id});
});

getWeek = () => {
	const t1 = moment('20021207');
	const t2 = moment();
	const dff = moment.duration(t2.diff(t1)).asDays();
	return Math.floor(dff/7)+1;
}




// module.exports = app;









app.listen(port, () => {
	console.log(`서버가 실행됩니다. http://localhost:${port}`);
})