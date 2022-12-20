const express = require('express');
const router = express.Router();
var crawlDataController = require('../controller/crawlDataController');

router.get('/get-products-shoppe', crawlDataController.getProductsShoppe);
router.get('/get-products-tiki', crawlDataController.getProductsTiki);
router.get('/get-products-lazada', crawlDataController.getProductsLazada);

module.exports = router;