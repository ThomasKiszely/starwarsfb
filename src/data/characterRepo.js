const Character = require('../models/Character.js');


async function createCharacter(characterData) {
    try {
        const newCharacter = new Character(characterData);
        return await newCharacter.save();
    } catch (error) {
        console.log('Fejl i repo ved oprettelse' + error.message);
        throw error;
    }
}
async function deleteCharacter(id) {
    try {
        const deleteCharacter = await Character.findByIdAndDelete(id);
        return deleteCharacter;
    } catch (error) {
        console.log('Fejl ved slet i repo');
        throw error;
    }
}
async function allCharacter() {
    try {
        return Character.find({});
    } catch (error) {
        console.log('Fejl i repo ved læsning af alle character');
        throw error;
    }
}
async function updateCharacter(id, characterData) {
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(id, characterData);
        return updatedCharacter;
    } catch (error) {
        console.log('Fejl i repo ved update af character');
        throw error;
    }
}
async function getCharacterById(id) {
    try {
        const character = await Character.findById(id);
        return character;
    } catch (error) {
        console.log('Fejl ved hentning af character');
        throw error;
    }
}

module.exports = {createCharacter, deleteCharacter, allCharacter, updateCharacter, getCharacterById};