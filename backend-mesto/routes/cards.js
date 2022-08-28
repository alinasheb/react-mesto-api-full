const router = require('express').Router();
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  disLikeCardValidation,
} = require('../middlewares/validations');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCardValidation, deleteCard);
router.put('/:cardId/likes', likeCardValidation, likeCard);
router.delete('/:cardId/likes', disLikeCardValidation, disLikeCard);

module.exports = router;
