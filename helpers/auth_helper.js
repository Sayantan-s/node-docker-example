const bcrypt = require('bcrypt')

module.exports = class AuthHelper{
    static async hashPassword(password){
        const salt = await bcrypt.genSalt(9);
        return await bcrypt.hash(password, salt);
    }
    static async verifyPassword(hashedPass, password){
        return await bcrypt.compare(hashedPass, password)
    }
}