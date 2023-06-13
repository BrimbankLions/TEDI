document.getElementById('add-student').addEventListener('click', function() {
    var name = prompt('Enter the student\'s name:');
    var id = prompt('Enter the student\'s ID:');

    var students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({name: name, id: id, attendance: {}});
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
});

document.getElementById('delete-student').addEventListener('click', function() {
    var name = prompt('Enter the name of the student to delete:');
    var id = prompt('Enter the ID of the student to delete:');

    var students = JSON.parse(localStorage.getItem('students'));
    students = students.filter(student => student.name !== name || student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
});

document.getElementById('table-body').addEventListener('click', function(e) {
    if (e.target.cellIndex === 0) { // If a name cell was clicked...
        var students = JSON.parse(localStorage.getItem('students'));
        var student = students[e.target.parentNode.rowIndex - 1];

        var totalHours = Object.values(student.attendance).reduce((total, num) => total + num, 0);
        var totalDays = Object.keys(student.attendance).length;
        var averageHoursPerDay = totalHours / totalDays;

        alert(student.name + '\'s attendance is ' + (averageHoursPerDay / 20 * 100).toFixed(2) + '%');
    } else if (e.target.cellIndex > 2) { // If an attendance cell was clicked...
        var hours = Number(prompt('Enter the hours attended:'));
        if (!isNaN(hours) && hours >= 0 && hours <= 20) {
            var students = JSON.parse(localStorage.getItem('students'));
            var student = students[e.target.parentNode.rowIndex - 1];

            var date = document.getElementById('table-header').children[0].children[e.target.cellIndex].innerText;
            student.attendance[date] = hours;
            localStorage.setItem('students', JSON.stringify(students));

            e.target.innerText = hours;
        }
    }
});

function displayStudents() {
    var students = JSON.parse(localStorage.getItem('students')) || [];

    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    students.forEach(function(student) {
        var row = tableBody.insertRow();
        var nameCell = row.insertCell();
        var idCell = row.insertCell();
        nameCell.innerText = student.name;
        idCell.innerText = student.id;

        var currentDate = new Date(new Date().getFullYear(), 0, 1);
        while (currentDate.getFullYear() === new Date().getFullYear()) {
            var attendanceCell = row.insertCell();
            var date = currentDate.toISOString().slice(0,10);
            attendanceCell.innerText = student.attendance[date] || '';
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });
}

function addDateHeaders() {
    var headerRow = document.getElementById('table-header').insertRow();
    headerRow.insertCell().innerText = 'Student Name';
    headerRow.insertCell().innerText = 'Student ID';

    var currentDate = new Date(new Date().getFullYear(), 0, 1);
    while (currentDate.getFullYear() === new Date().getFullYear()) {
        var dateHeader = document.createElement('th');
        dateHeader.innerText = currentDate.toISOString().slice(0,10);
        headerRow.appendChild(dateHeader);
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

addDateHeaders();
displayStudents();
