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
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const UserDB_1 = require("../Entities/UserDB");
const ResponseData_1 = require("../ThirdPartyFunction/ResponseData");
var controller = (0, express_1.default)();
controller.use(body_parser_1.default.json());
var rad;
function sendVerify(input, req) {
    rad = input;
    let link = "http://" + req.get('host') + "/api/v1/mail/verify-mail?id=" + rad;
    var transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        auth: {
            user: 'honguyenthanhtin17@gmail.com',
            pass: 'yfvywupoigcbaalf',
        }
    });
    var mailOptions = {
        from: 'Colyseus@gmail.com',
        to: input,
        subject: 'Confirmation Verify Gmail For Colyseus',
        text: 'You reveice a message from Colyseus@gmail.com',
        html: '<p>ColyseusYou requested for email verification, kindly use this <a href=' + link + '>link</a> to verify your email address</p>',
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Sent A Message' + info.response);
        }
    });
}
;
controller.get(`/verify-mail`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let entityManager = (0, typeorm_1.getMongoManager)();
        if (req.query.id == rad) {
            const userSelected = yield entityManager.findOneBy(UserDB_1.User, {
                gmail: req.query.id
            });
            if (userSelected) {
                userSelected.isVerify = true;
                yield entityManager.save(userSelected);
                let resData = new ResponseData_1.responseData();
                resData.message = "Gmail is confirmed verification";
                resData.status_code = 200;
                res.status(resData.status_code).send(resData);
            }
            else {
                let resData = new ResponseData_1.responseData();
                resData.message = "Bad Request";
                resData.status_code = 400;
                res.status(resData.status_code).send(resData);
            }
        }
        else {
            let resData = new ResponseData_1.responseData();
            resData.message = "Bad Request";
            resData.status_code = 400;
            res.status(resData.status_code).send(resData);
        }
    }
    catch (err) {
        console.log(err);
    }
}));
module.exports = {
    controller: controller,
    sendVerify: sendVerify,
};
