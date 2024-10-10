// Your code here
// Function to create an employee record
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(arrOfArrs) {
  return arrOfArrs.map(createEmployeeRecord);
}

// Function to add a time-in event to an employee record
function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

// Function to add a time-out event to an employee record
function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

// Function to calculate hours worked on a given date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(
    (event) => event.date === date
  ).hour;
  const timeOut = employee.timeOutEvents.find(
    (event) => event.date === date
  ).hour;
  return (timeOut - timeIn) / 100;
}

// Function to calculate wages earned on a given date
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, timeInEvent) => {
    return total + wagesEarnedOnDate(employee, timeInEvent.date);
  }, 0);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}

// Example usage
const employeeData = [
  ["Thor", "Odinson", "God of Thunder", 100],
  ["Loki", "Laufeyson", "God of Mischief", 80],
];

const employees = createEmployeeRecords(employeeData);

createTimeInEvent(employees[0], "2022-03-15 0900");
createTimeOutEvent(employees[0], "2022-03-15 1100");
createTimeInEvent(employees[1], "2022-03-15 1000");
createTimeOutEvent(employees[1], "2022-03-15 1300");

console.log(
  "Thor worked hours on 2022-03-15:",
  hoursWorkedOnDate(employees[0], "2022-03-15")
);
console.log(
  "Thor earned wages on 2022-03-15:",
  wagesEarnedOnDate(employees[0], "2022-03-15")
);
console.log("Loki total wages:", allWagesFor(employees[1]));
console.log("Total payroll:", calculatePayroll(employees));
