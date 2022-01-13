const fs = require('fs').promises;

const readOnFile = async (pathFile) => {
  try {
    const talkerBody = await fs.readFile(pathFile, 'utf8');
    return JSON.parse(talkerBody);
  } catch (err) {
    return null;
  }
};

const writeOnFile = async (pathFile, fileBody) => {
  const talkerBody = await readOnFile(pathFile) || [];
  const newTalker = { id: talkerBody.length + 1, ...fileBody };
  talkerBody.push(newTalker);
  await fs.writeFile(pathFile, JSON.stringify(talkerBody));
  return newTalker;
};

const editOnFile = async (pathFile, id, fileBody) => {
    const oldFile = await readOnFile(pathFile) || [];
    const editTalker = { id: Number(id), ...fileBody };
    const updateFile = oldFile.map((talker) => (talker.id !== Number(id) ? talker : editTalker));
    await fs.writeFile(pathFile, JSON.stringify(updateFile));
    return editTalker;
};

const deleteOnFile = async (pathFile, id) => {
  const oldFile = await readOnFile(pathFile) || [];
  const newFile = oldFile.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(pathFile, JSON.stringify(newFile));
};

const searchOnFile = async (pathFile, searchTerm) => {
  const oldFile = await readOnFile(pathFile) || [];
  if (!searchTerm || searchTerm === '') return oldFile;
  const searchedFile = oldFile.filter((talker) => talker.name.includes(searchTerm));
  return searchedFile;
};

module.exports = {
    readOnFile,
    writeOnFile,
    editOnFile,
    deleteOnFile,
    searchOnFile,
};
