const { createCharacter, deleteCharacter, allCharacter, updateCharacter, getCharacterById}  = require("../data/characterRepo.js");
const {formatSWText} = require("../utils/swTextFormatter");



async function createCharacterService(character) {
    return await createCharacter(character);
}
async function getAllCharactersService() {
    return allCharacter();
}
async function removeCharacterService(id) {
    return await deleteCharacter(id);
}
async function updateCharacterService(id, character) {
    return await updateCharacter(id, character);
}
async function downloadCharacterService(id) {
    const character = await getCharacterById(id);
    return formatSWText(character);
}
module.exports = {createCharacterService, getAllCharactersService, removeCharacterService, updateCharacterService, downloadCharacterService};