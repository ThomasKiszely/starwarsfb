const { createCharacterService, getAllCharactersService, removeCharacterService, updateCharacterService, downloadCharacterService } = require('../service/characterService')

async function getAllCharactersController(req, res, next) {
    try {
        const characters = await getAllCharactersService();
        console.log(characters);
        return res.status(200).json(characters);
    } catch (error) {
        console.log('Fejl i controller ved hentning af figurer');
        next(error);
    }
}
async function createCharacterController(req, res, next){
    try {
        const character = req.body;
        const newCharacter = await createCharacterService(character);
        return res.status(200).json(newCharacter);
    } catch (error) {
        console.log('Fejl i controller ved skabelse af figur');
        next(error);
    }
}

async function updateCharacterController(req, res, next){
    try {
        const id = req.params.id;
        const character = req.body;
        const updatedCharacter = await updateCharacterService(id, character);
        return res.status(200).json(updatedCharacter);
    } catch (error) {
        console.log('Fejl i controller ved opdatering af figur');
        next(error);
    }
}

async function deleteCharacterController(req, res, next){
    try {
        const id = req.params.id;
        const deletedCharacter = await removeCharacterService(id);
        res.status(200).json(deletedCharacter);
    } catch (error) {
        console.log('Fejl i controller ved sletning af figur');
        next(error);
    }
}

async function downloadCharacter(req, res, next) {
    try {
        const id = req.params.id;
        const downloadCharacter = await downloadCharacterService(id);
        res.setHeader('Content-Disposition', `attachment; filename=StarWars-${id}.txt`);
        res.setHeader('Content-Type', 'text/plain');
        res.send(downloadCharacter);
    } catch (error) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Could not generate file' });
        next(error);
    }
        res.status(200).json(downloadCharacter);
}

module.exports = {
    getAllCharactersController,
    createCharacterController,
    updateCharacterController,
    deleteCharacterController,
    downloadCharacter
}