let students = [];

function addStudent() {
    const studentName = prompt('Enter student name');
    const studentID = prompt('Enter student ID');
    students.push({ name: studentName, id: studentID, hours: [] });
    renderTable();
}

function removeStudent() {
    const studentName = prompt('Enter student name to remove');
    const studentID = prompt('Enter student ID to remove');
    students = students.filter(s => s.name !== studentName || s.id !== studentID);
    renderTable();
}

function updateHours(name, id, index) {
    const hours = Number(prompt('Enter hours'));
    const student = students.find(s => s.name === name && s.id === id);
    student.hours[index] = hours;
    renderTable();
}

function renderTable() {
    const table = document.getElementById('table');
    table.innerHTML = '';

    // Create student name and id columns
    const nameColumn = document.createElement('div');
    nameColumn.classList.add('column', 'sticky');
    nameColumn.innerHTML = `<div><strong>Student Name</strong></div>` + students.map(s => `<div>${s.name}</div>`).join('');
    table.appendChild(nameColumn);

    const idColumn = document.createElement('div');
    idColumn.classList.add('column', 'sticky');
    idColumn.innerHTML = `<div><strong>Student ID</strong></div>` + students.map(s => `<div>${s.id}</div>`).join('');
    table.appendChild(idColumn);

    // Create columns for each day of the year
    const currentDate = new Date(new Date().getFullYear(), 0, 1);
    let columnIndex = 0;
    while (currentDate.getFullYear() === new Date().getFullYear()) {
        const column = document.createElement('div');
        column.classList.add('column');
        column.innerHTML = `<div><strong>${currentDate.toISOString().slice(0, 10)}</strong></div>` + students.map(s => `<div onclick="updateHours('${s.name}', '${s.id}', ${columnIndex})">${s.hours[columnIndex] || ''}</div>`).join('');
        table.appendChild(column);
        currentDate.setDate(currentDate.getDate() + 1);
        columnIndex++;
    }
}

renderTable();
