const express = require('express');
const router = express.Router();
const app = express();
const { initOptions, db } = require('../db');

router.post('/api/test/read', async (req, res) => {
    try {                    
        let query = 'SELECT * FROM "content_list"';
        if (req.body.searchText !== undefined && req.body.searchText !== null && req.body.searchText !== "") {
            query += 'WHERE content like \'%' + req.body.searchText + '%\''; 
        }        
        const data = await db.any(query);
        res.json(data);
    } catch (error) {
        console.error('Error querying PostgreSQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;