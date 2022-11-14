const express = require('express');
const router = express.Router();

const request = require('request');
const moment = require("moment");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/lottos/last', (req, res) => {

  let week = getWeek();

	request.get({uri:"https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+week, strictSSL: false}, 
	(error, response, body) => {
		console.log(error);
		res.json(JSON.parse(body));
	});

});

router.get('/lottos/:id', (req, res) => {
	request.get({uri:"https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+req.params.id, strictSSL: false}, 
	(error, response, body) => {
		res.json(JSON.parse(body));
	});
})

router.get('/documents/:id', (req,res) => {
	res.json({id: req.params.id});
});

getWeek = () => {
	const t1 = moment('20021207');
	const t2 = moment();
	const dff = moment.duration(t2.diff(t1)).asDays();
	return Math.floor(dff/7)+1;
}

module.exports = router;