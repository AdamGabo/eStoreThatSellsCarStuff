const router = require('express').Router();
const carController = require('../../controllers/filter-controller');

router.route('/')
      .get(carController.findVehicleApi);

router.route('/year')
      .get(carController.getYears);

module.exports = router;


