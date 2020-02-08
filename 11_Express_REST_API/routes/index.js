const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET : READ All the employees
router.get('/employees',(request,response) => {
    fs.readFile(path.join(__dirname,'..','database','employees.json'),'utf-8',(err,data) => {
        if(err) throw  err;
        let employees = JSON.parse(data);
        response.json(employees);
    });
});

// GET : READ a single employee
router.get('/employees/:id',(request,response) => {
    let empId = Number.parseInt(request.params.id);
    fs.readFile(path.join(__dirname,'..','database','employees.json'),'utf-8',(err,data) => {
        if(err) throw  err;
        let employees = JSON.parse(data);
        let selectedEmployee = employees.find(function(employee) {
           return employee.id === empId;
        });
        response.json(selectedEmployee);
    });
});

// POST : CREATE a new Employee
router.post('/employees',(request,response) => {
    fs.readFile(path.join(__dirname,'..','database','employees.json'),'utf-8',(err,data) => {
        if(err) throw  err;
        let employees = JSON.parse(data);
        let maxId = Math.max(...employees.map(employee => employee.id));
        let newEmployee = {
            id : maxId + 1,
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            email : request.body.email,
            gender : request.body.gender,
            ip_address : request.body.ip_address
        };
        employees.push(newEmployee);
        fs.writeFile(path.join(__dirname,'..','database','employees.json'),JSON.stringify(employees),'utf-8',(err) => {
            if(err) throw  err;
            response.json(newEmployee);
        });
    });
});

// PUT : UPDATE an Employee
router.put('/employees/:id',(request,response) => {
    let empId = Number.parseInt(request.params.id);
    fs.readFile(path.join(__dirname,'..','database','employees.json'),'utf-8',(err,data) => {
        if(err) throw  err;
        let employees = JSON.parse(data);
        let selectedEmployee = employees.find(employee => employee.id === empId);
        let updatedEmployee = {
            id : empId,
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            email : request.body.email,
            gender : request.body.gender,
            ip_address : request.body.ip_address
        };
        // replace the existing employee with updated employee
        employees.splice(employees.indexOf(selectedEmployee),1,updatedEmployee);
        fs.writeFile(path.join(__dirname,'..','database','employees.json'),JSON.stringify(employees),'utf-8',(err) => {
            if(err) throw  err;
            response.json(updatedEmployee);
        });
    });
});

// DELETE : DELETE an Employee
router.delete('/employees/:id',(request,response) => {
   let empId = Number.parseInt(request.params.id);
    fs.readFile(path.join(__dirname,'..','database','employees.json'),'utf-8',(err,data) => {
        if(err) throw  err;
        let employees = JSON.parse(data);
        let selectedEmployee = employees.find(employee => employee.id === empId);
        // remove the selected employee from the array
        employees.splice(employees.indexOf(selectedEmployee),1);
        fs.writeFile(path.join(__dirname,'..','database','employees.json'),JSON.stringify(employees),'utf-8',(err) => {
            if(err) throw  err;
            response.json(`Employee is removed from db ${empId}`);
        });
    });
});

module.exports = router;
