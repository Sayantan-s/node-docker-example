const bcrypt = require('bcrypt')

module.exports = class AuthHelper{
    static async hashPassword(password){
        const salt = await bcrypt.genSalt(9);
        return await bcrypt.hash(password, salt);
    }
    static async verifyPassword(password, hash){
        return await bcrypt.compare(password, hash)
    }
}