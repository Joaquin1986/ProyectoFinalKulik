// Se realizan los imports mediante 'require', de acuerdo a lo visto en clase
const { Router } = require('express');
const { SessionsControllers } = require('../../controllers/sessions.controllers');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyAdmin } = require('../../passport/verifyAdmin');

const usersApiRouter = Router();

// El endpoint "/sessions/login" es para registrar los usuarios, mientras que el "/sessions/login" es 
// para realizar inicio de sesión, pasando un obj usuario en el body.
// El enpoint '/sessions/current' valida la sesión del usuario

usersApiRouter.post('/sessions/register', SessionsControllers.createUser);

// Solamente un admin puede crear a otro
usersApiRouter.post('/sessions/register/admin', passportCallBack('current'), verifyAdmin, SessionsControllers.createAdminUser);

usersApiRouter.post('/sessions/login', SessionsControllers.login);

//Se implementa patrón de diseño Repository (SessionRepository) para mayor abstracción entre DTO y DAO
usersApiRouter.get('/sessions/current', passportCallBack('current'), SessionsControllers.getCurrentSession);

module.exports = usersApiRouter;