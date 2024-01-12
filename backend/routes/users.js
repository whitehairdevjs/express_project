var express = require('express');
var router = express.Router();
const { initOptions, db } = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource users');
});


router.post('/save', async (req, res) => {
    try {
        let userInfo = req.body.userInfo;

        let queryText =  'INSERT INTO "user_info"';
        queryText     += ' (email, phone_number, gender, name, password_encrypted, chk_terms_use, chk_privacy, chk_marketing, is_deleted, created_at, updated_at, profile_image_path)'
        queryText     += ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, now(), now(), $9)';
        const query = {
            text: queryText,
            values:
            [          
                userInfo.email,
                userInfo.phone_number,
                userInfo.gender,
                userInfo.name,
                userInfo.password,
                userInfo.chk_terms_use,
                userInfo.chk_privacy,
                userInfo.chk_marketing,
                userInfo.profile_image_path
            ],
        };
        const data = await db.any(query);

        res.json(data);
    } catch (error) {
        console.error('Error querying PostgreSQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
