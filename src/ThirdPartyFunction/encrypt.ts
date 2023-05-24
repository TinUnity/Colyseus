import bcrypt from 'bcryptjs';
import crypto from 'crypto';

async function encryptPassword(password, saltRound) {
    try {
        const hash = await bcrypt.hash(password, saltRound);
        return hash;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function dencryptPassword(password, cryptPassword) {
    try {
        const isValid = bcrypt.compare(password, cryptPassword);
        return isValid;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

function createHex() {
    try {
        const hex = crypto.randomBytes(64).toString('hex');
        return hex;
    } catch (error) {
        console.log(error);
    }
}
export { encryptPassword, dencryptPassword, createHex };