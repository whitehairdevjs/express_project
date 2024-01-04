var express = require('express');
var router = express.Router();
const { initOptions, db } = require('../db');
const cors = require('cors');
const winston = require('winston');
const getTestDataQuery = require('../queries/getTestData');
const app = express();
const logger = winston.createLogger();

const corsOptions = {
  origin: 'http://localhost:3000', // 클라이언트 도메인
  optionsSuccessStatus: 200, // Legacy browser support
};

router.use(cors());
// app.use('/api/test', contentRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get/nodejs-api', function(req, res){
    res.status(200).json({
        "message" : "hello get api nodejs-api"
    });
});

router.post('/post/nodejs-api',function(req, res, next){
	res.status(200).json({
    	"message" : "hello post api nodejs-api"
    });
});

router.post('/post/jskim', (req, res, next) => {
    res.status(200).json({
        "message" : "msg kjs project."
        , "data"  : {"values" : "kim", "height":"177", "status": "none"}
    });
});

router.post('/api/test/read', async (req, res) => {
  try {    
    const data = await db.any(req.body.customQuery);
    res.json(data);
  } catch (error) {
    console.error('Error querying PostgreSQL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;