// express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path'), mysql = require('mysql');
const fs = require('fs');

// mysql 기본설정
const conn = {
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '112antkglok!',
	database: 'eco_dressroom'
};

// express 미들웨어 불러오기
var static = require('serve-static');

// express 객체 생성
var app = express();
var router = express.Router();

// 기본 속성 설정
app.set('port', process.env.PORT || 5959);
app.set('host', '192.168.50.14');

// static 서버 미들웨어 사용
app.use(static(__dirname)); // 현재 폴더에 대한 정적 접근 허용

// json 대역폭 설정
app.use(express.json({
	limit : "50mb"
}));

// body-parser : Post request 파싱
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/post', function(req, res, next){
	var connection = mysql.createConnection(conn);
	connection.connect();
	console.log(req.body);
	console.log(req.body.message.user);
	
	var res_data_string = {response_code: "0000"};
   	var res_data_json = JSON.stringify(res_data_string);
   	res.json(res_data_json);
   	
});


http.createServer(app).listen(app.get('port'), app.get('host'), ()=>{
	console.log('Express server running at ' + app.get('host') + ':' + app.get('port'));
});

