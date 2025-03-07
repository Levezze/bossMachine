const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase } = require('../db')

apiRouter.get('/minions', (req, res, next) => {

})



module.exports = apiRouter;