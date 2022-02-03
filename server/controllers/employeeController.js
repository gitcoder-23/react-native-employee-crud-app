/* eslint-disable no-undef */
const EmployeeModel = require('../models/EmployeeModel');

// Add Employee => /api/v1/create
exports.addEmployee = async (req, res, next) => {
  const employee = await EmployeeModel.create(req.body);
  try {
    console.log('employee->', employee);

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      employee,
    });
  } catch (error) {
    console.log(error);
  }
};

// get all Employees => /api/v1/employees
exports.getEmployees = async (req, res, next) => {
  const employees = await EmployeeModel.find();

  res.status(200).json({
    success: true,
    count: employees.length,
    message: 'All employees have been dislayed',
    employees,
  });
};

// Update employee => /api/v1/update/:id
exports.updateEmployee = async (req, res, next) => {
  // "id" is same as route id

  let employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // header problem solved
  res.status(200).json({
    success: true,
    message: 'Employee updated successfully',
    employee,
  });
};

// Delete employee => /api/v1/delemployee/:id
exports.deleteEmployee = async (req, res, next) => {
  // "id" is same as route id

  const employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }
  await employee.remove();

  res.status(200).json({
    success: true,
    message: 'Employee has been deleted',
    employee,
  });
};
