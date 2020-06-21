const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM customer where isDeleted=0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
}); 
/*./upload 폴더의 경로를 /image로 치환? 좀더 알아봐야할 듯*/
app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'Insert into customer values (null, ?, ?, ?, ?, ?, now(), 0)';
    /*let image = '/image/'+req.file.filename;*/
    let image = 'http://localhost:5000/image/'+req.file.filename;
    let name = req.body.name;
    let birth = req.body.birth;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birth, gender, job];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
});

/*
    특정 id 값으로 삭제 요청이 들어왔을 경우
    customer 테이블에 isDeleted 데이터를 1 로 변경해주어
    화면에서 해당 데이터가 보이지 않도록 설정 값을 변경
*/
app.delete('/api/customers/:id', (req, res) => {
    let sql = 'Update customer SET isDeleted=1 where id = ?';
    let params = [req.params.id];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
app.listen(port, () => console.log(`Listening on port ${port}`));