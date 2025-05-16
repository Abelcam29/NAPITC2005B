const dataSource = require('../Datasource/MySQLMngr');
const bcrypt = require('bcrypt');

/** 
 * @param {*} pass
 * @returns
 */
async function encryptPassword(pass){
    let password = await bcrypt.hash(pass, 8);
    return password;
}

/**
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function isValidUser(username, password){
    //let query = 'SELECT id, name, username, password, age, hash_password from usuario where username = ?';
    let query = 'SELECT * FROM usuario WHERE email = ? AND password = ?';
    let params = [username, password];
    qResult = await dataSource.getDataWithParams(query, params);
    let user = qResult.rows[0];
    if(user){
        //let isEqual = await bcrypt.compare(password, user.hash_password);
        //if(isEqual)
        //{
            return user;
        //}
    }
    return null;
}

module.exports = {encryptPassword, isValidUser};