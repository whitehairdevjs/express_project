const express = require('express');
const router = express.Router();
const app = express();

router.post('/api/test/jskim', (req, res) => {
    res.status(200).json({
        "message": 'Hello from test.js API!'
    });
});

module.exports = router;