const express = require('express');
const router = express.Router();

const { list, create, remove, videogameById, photo, read } = require('../controllers/videogameController');
const { userById } = require('../controllers/authController')

router.get('/videogames', list)
router.get('/photo/:videogameId', photo)
router.post('/create/:userId', create)
router.delete('/:videogameId', remove)
router.get('/:videogameId', read)


router.param("videogameId", videogameById);
router.param('userId', userById)
  
module.exports= router;