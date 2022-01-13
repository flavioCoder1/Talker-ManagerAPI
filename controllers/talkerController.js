const router = require('express').Router();

const { 
    readOnFile,
    writeOnFile,
    editOnFile,
    deleteOnFile,
    searchOnFile,
} = require('../model/CRUD');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middleware/validations');

const SUCESSFUL_RESPONSE = 200;
const SUCESSFUL_WRITE_RESP = 201;
const ERROR_USER_NOT_FOUND = 404;

const FILE_PATH = './talker.json';

router.get('/', async (_req, res) => {
  const talker = await readOnFile(FILE_PATH) || [];
  res.status(SUCESSFUL_RESPONSE).json(talker);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talker = await searchOnFile(FILE_PATH, q);
  res.status(SUCESSFUL_RESPONSE).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readOnFile(FILE_PATH) || [];
  const findID = talker.find((item) => item.id === Number(id));
  if (!findID) { 
    return res.status(ERROR_USER_NOT_FOUND)
    .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(SUCESSFUL_RESPONSE).json(findID);
});

router.use(validateToken);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;  
  await deleteOnFile(FILE_PATH, id);
  res.status(SUCESSFUL_RESPONSE).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
);

router.post('/', async (req, res) => {
  const talker = await writeOnFile(FILE_PATH, req.body);
  res.status(SUCESSFUL_WRITE_RESP).json(talker);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await editOnFile(FILE_PATH, id, req.body);
  res.status(SUCESSFUL_RESPONSE).json(talker);
});

module.exports = router;
