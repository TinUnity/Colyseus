"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const UserDB_1 = require("../Entities/UserDB");
const colyseus_1 = require("colyseus");
const ResponseData_1 = require("../ThirdPartyFunction/ResponseData");
const RegularString_1 = require("../ThirdPartyFunction/RegularString");
const encrypt_1 = require("../ThirdPartyFunction/encrypt");
const MailController = require('./MailController');
const controller = (0, express_1.default)();
controller.use(body_parser_1.default.json());
controller.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityManager = (0, typeorm_1.getMongoManager)();
        let userManager = {
            'gmail': req.body.gmail,
            'password': req.body.password,
            'username': req.body.username,
            'passwordConfirm': req.body.passwordConfirm
        };
        if (!(0, RegularString_1.getEmailToString)(userManager.gmail)) {
            let resData = new ResponseData_1.responseData();
            resData.message = "Email Not Valid";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
        if (!userManager.password || !userManager.username) {
            let resData = new ResponseData_1.responseData();
            resData.message = "Some fields are empty, please re-check";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
        if (userManager.password != userManager.passwordConfirm) {
            let resData = new ResponseData_1.responseData();
            resData.message = "Password confirm Not Valid";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
        const user = yield entityManager.findOneBy(UserDB_1.User, {
            gmail: userManager.gmail
        });
        if (!user) {
            const genPassword = yield (0, encrypt_1.encryptPassword)(userManager.password, 10);
            const UserDB = new UserDB_1.User();
            UserDB.id = (0, colyseus_1.generateId)();
            UserDB.gmail = userManager.gmail;
            UserDB.password = genPassword;
            UserDB.username = userManager.username;
            UserDB.isVerify = false;
            yield entityManager.save(UserDB);
            MailController.sendVerify(UserDB.gmail, req);
            let resData = new ResponseData_1.responseData();
            resData.message = "Please Confirm Verify Gmail";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
        else {
            let resData = new ResponseData_1.responseData();
            resData.message = "Gmail Is Registed";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
    }
    catch (err) {
        console.log(err);
    }
}));
controller.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityManager = (0, typeorm_1.getMongoManager)();
        let reqData = {
            'gmail': req.body.gmail,
            'password': req.body.password,
            'isVerify': req.body.isVerify,
        };
        if (!(0, RegularString_1.getEmailToString)(reqData.gmail)) {
            let resData = new ResponseData_1.responseData();
            resData.message = "Email Not Valid";
            resData.status_code = 200;
            return res.status(resData.status_code).send(resData);
        }
        else {
            if (!reqData.password) {
                let resData = new ResponseData_1.responseData();
                resData.message = "Password is empty, please re-check";
                resData.status_code = 200;
                return res.status(resData.status_code).send(resData);
            }
            const getGmailDatabase = yield entityManager.findOneBy(UserDB_1.User, {
                gmail: reqData.gmail
            });
            if (getGmailDatabase) {
                if (!getGmailDatabase.isVerify) {
                    let resData = new ResponseData_1.responseData();
                    resData.message = "This gmail hasn't confirmed yet, please confirm";
                    resData.status_code = 200;
                    return res.status(resData.status_code).send(resData);
                }
                else {
                    const isValid = yield (0, encrypt_1.dencryptPassword)(reqData.password, getGmailDatabase === null || getGmailDatabase === void 0 ? void 0 : getGmailDatabase.password);
                    console.log(isValid);
                    if (isValid) {
                        let resData = new ResponseData_1.responseData();
                        resData.message = "Congratulation! Succeed Login";
                        resData.status_code = 200;
                        return res.status(resData.status_code).send(resData);
                    }
                    else {
                        let resData = new ResponseData_1.responseData();
                        resData.message = "Password is invalid, please re-check";
                        resData.status_code = 200;
                        return res.status(resData.status_code).send(resData);
                    }
                }
            }
            else {
                let resData = new ResponseData_1.responseData();
                resData.message = "Account doesn't exists";
                resData.status_code = 200;
                return res.status(resData.status_code).send(resData);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = controller;
