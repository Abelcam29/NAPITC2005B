const dataSource = require('../Datasource/MySQLMngr');
const hashService = require('./hashPassword');

/** 
 * @returns
 */
async function getUsers(){
    let qResult;
    try{
        let query = "SELECT * FROM usuario";
        qResult = await dataSource.getData(query);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}

/**
 * @param {int} idUsuario
 * @returns
 */
async function findUser(idUsuario){
    let qResult;
    try{
        let query = "SELECT * FROM usuario WHERE idUsuario = ?";
        let params = [idUsuario]
        qResult = await dataSource.getDataWithParams(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

/**
 * @param {*} user
 * @returns
 */
async function insertUser(user){
    let qResult;
    try{
        let query = "INSERT INTO usuario (Nombre, Apellidos, email, password, nombreOrganizacion, hash_password) VALUES (?,?,?,?,?,?)";
        user.hash.password = await hashService.encryptPassword(user.password);
        let params = [user.Nombre, user.Apellidos, user.email, user.password, user.nombreOrganizacion, user.hash_password];
        qResult = await dataSource.getDataWithParams(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}

/**
 * @param {*} user
 * @returns
 */
async function updateUser(user){
    let qResult;
    try{
        let query = "UPDATE usuario SET name = ?, username = ?, password = ?, age = ?, hash_password = ? WHERE id = ?";
        user.hash_password = await hashService.encryptPassword(user.password);
        let params = [user.name, user.username, user.password, user.age, user.hash_password, user.id];
        qResult = await dataSource.updateData(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}
/**
 * @param {int} user_id
 * @returns
 */
async function deleteUser(user_id){
    let qResult;
    try{
        let query = "DELETE FROM usuario WHERE id = ?";
        let params = [user_id];
        qResult = await dataSource.deleteUser(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}

module.exports = {
    getUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser
}