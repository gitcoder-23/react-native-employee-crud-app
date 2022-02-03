const express = require('express');
const router = express.Router();

const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// this is user part
router.route('/employees').get(getEmployees);
router.route('/create').post(addEmployee);
router.route('/update/:id').post(updateEmployee);
router.route('/delemployee/:id').post(deleteEmployee);

module.exports = router;
