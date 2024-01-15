const { initOptions, db } = require('../db');
const util = require('../utils/password');

const controller = {
    async login (req, res, next) {
        try {
            let userInfo = req.body.userInfo;
    
            let queryText =  'SELECT email, phone_number, gender, name, password_encrypted, chk_terms_use, chk_privacy, chk_marketing FROM "user_info"';
            queryText     += ' WHERE email = $1'
            queryText     += ' AND password_encrypted = $2';
            const query = {
                text: queryText,
                values:
                [          
                    userInfo.email,                
                    userInfo.password                
                ],
            };
            const data = await db.any(query);            
            res.json(data);                        
        } catch (error) {
            console.error('Error querying PostgreSQL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        /**
         * POST요청을 통해 req.body에 담긴 사용자의 id와 name을 추출하는 로직
         */        
        // const refreshToken = jwt.sign({},
        //     process.env.JWT_SECRET, {
        //     expiresIn: '14d',
        //     issuer: 'cotak'
        // });
        // const connection = await pool.getConnection(async conn => await conn);
        // try {
        //     // DB에 refresh 토큰 삽입
        //     await connection.beginTransaction();
        //     await connection.query(`
        //         INSERT INTO 
        //         tokens(content, user_no)
        //         VALUE 
        //         (?, ?);
        //     `, [refreshToken, user_no]);
        //     await connection.commit();

        //     // 토큰 세팅
        //     const accessToken = jwt.sign({ userId, userName },
        //         process.env.JWT_SECRET, {
        //         expiresIn: '1h',
        //         issuer: 'cotak'
        //     });
            
        //     // 웹 브라우저(클라이언트)에 토큰 세팅
        //     res.cookie('accessToken', accessToken); 
        //     res.cookie('refreshToken', refreshToken);
        //     next();
        // } catch (e) {
        //     await connection.rollback();
        //     next(e);
        // } finally {
        //     connection.release();
        // }
    },
    
    async singUp (req, res, next) {
        try {
            let userInfo = req.body.userInfo;

            let encryptObject = await util.createHashedPassword(userInfo.password);

            let queryText =  'INSERT INTO "user_info"';
            queryText     += ' (email, phone_number, gender, name, password_encrypted, chk_terms_use, chk_privacy, chk_marketing, is_deleted, created_at, updated_at, profile_image_path, salt)';
            queryText     += ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, now(), now(), $9, $10)';
            const query = {
                text: queryText,
                values:
                [          
                    userInfo.email,
                    userInfo.phone_number,
                    userInfo.gender,
                    userInfo.name,
                    encryptObject.hashedPassword,
                    userInfo.chk_terms_use,
                    userInfo.chk_privacy,
                    userInfo.chk_marketing,
                    userInfo.profile_image_path,
                    encryptObject.salt
                ],
            };
            const data = await db.any(query);
    
            res.json(data);
        } catch (error) {
            console.error('Error querying PostgreSQL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async find (req, res, next) {

    }
}

module.exports = controller;