import bcrypt from 'bcryptjs';

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

export { encryptPassword, dencryptPassword };