const express = require('express');
const router = express.Router();

const { getAllCharactersController, createCharacterController, deleteCharacterController, updateCharacterController, downloadCharacter } = require('../controllers/characterController');
const { validateCharacter, sanitizeCharacter } = require('../middleware/middlewares');

router.get('/characters', getAllCharactersController);
router.post('/characters',sanitizeCharacter, validateCharacter, createCharacterController);
router.delete('/characters/:id', deleteCharacterController);
router.put('/characters/:id', sanitizeCharacter, validateCharacter, updateCharacterController);
router.get('/characters/:id/download', downloadCharacter);


module.exports = router;