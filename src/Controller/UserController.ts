import express from 'express';
import bodyParser from 'body-parser';
import { getMongoManager } from 'typeorm';
import { getEmailToString } from '../ThirdPartyFunction/RegularString';
import { User } from '../Entities/UserDB';
import { generateId } from 'colyseus';
import { responseData } from '../ThirdPartyFunction/ResponseData';

const MailController = require('./MailController');
const controller = express();
controller.use(bodyParser.json());
controller.post('/register', async (req, res) => {
    try {
        const entityManager = getMongoManager();
        let userManager = {
            'gmail': req.body.gmail,
            'password': req.body.password,
            'username': req.body.username,
        }
        if (!getEmailToString(userManager.gmail)) {
            res.send('Email Not Valid');
            return;
        }
        const user = await entityManager.findOneBy(User, {
            gmail: userManager.gmail
        });
        if (!user) {
            const UserDB = new User();
            UserDB.id = generateId();
            UserDB.gmail = userManager.gmail;
            UserDB.password = userManager.password;
            UserDB.username = userManager.username;
            UserDB.isVerify = false;

            await entityManager.save(UserDB);

            MailController.sendVerify(UserDB.gmail, req);
            let resData = new responseData();
            resData.message = "Please Confirm Verify Gmail";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
        else {
            let resData = new responseData();
            resData.message = "Gmail Is Registed";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = controller;