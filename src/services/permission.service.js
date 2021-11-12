const { permisionModel } = require('../models'); // import permission model

const getPermissions = () => permisionModel.getPermissions(); // get permision list from the model
const getRolePermissions = () => permisionModel.getRolePermissions(); // get rolePermision list from the model

module.exports = { getPermissions,getRolePermissions };