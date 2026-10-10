
function switchTab(tabId) {
    document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-links button').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    document.getElementById('btn-' + tabId).classList.add('active');
}

function initDateSelectors() {
    const daySelect = document.getElementById('birthDay');
    const yearSelect = document.getElementById('birthYear');
    
    for (let i = 1; i <= 31; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i < 10 ? '0' + i : i;
        daySelect.appendChild(opt);
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        yearSelect.appendChild(opt);
    }
}

function calculateAge(event) {
    event.preventDefault();
    const day = parseInt(document.getElementById('dia').value);
    const month = parseInt(document.getElementById('meses').value);
    const year = parseInt(document.getElementById('año').value);

    const birthDate = new Date(year, month, day);
    const today = new Date();

    if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month || birthDate.getDate() !== day) {
        document.getElementById('ageResult').style.color = '#ef4444';
        document.getElementById('ageResult').textContent = "Por favor, seleccione una fecha válida.";
        return;
    }

    if (birthDate > today) {
        document.getElementById('ageResult').style.color = '#ef4444';
        document.getElementById('ageResult').textContent = "La fecha no puede ser en el futuro.";
        return;
    }

    let years = today.getFullYear() - year;
    let months = today.getMonth() - month;

    if (months < 0 || (months === 0 && today.getDate() < day)) {
        years--;
        months += 12;
    }

    if (today.getDate() < day) {
        months--;
        if (months < 0) {
            months = 11;
        }
    }

    document.getElementById('ageResult').style.color = '#16a34a';
    document.getElementById('ageResult').textContent = `You are ${years} years ${months} months old`;
}

function validateTempForm() {
    const val = document.getElementById('tempValue').value;
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    const btn = document.getElementById('convertBtn');

    if (val !== "" && from !== "" && to !== "") {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', 'true');
    }
}

function convertTemperature() {
    const val = parseFloat(document.getElementById('tempValue').value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;

    if (isNaN(val)) return;

    let celsius;

    if (from === 'Celsius') celsius = val;
    else if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
    else if (from === 'Kelvin') celsius = val - 273.15;

    let result;

    if (to === 'Celsius') result = celsius;
    else if (to === 'Fahrenheit') result = (celsius * 9/5) + 32;
    else if (to === 'Kelvin') result = celsius + 273.15;

    document.getElementById('tempResult').textContent = `${val} ${from} is ${Number(result.toFixed(2))} ${to}`;
}
let tasks = [
    { descripcion: "nueva", completada: false },
    { descripcion: "tarea completadas", completada: false },
    { descripcion: "borrar", completada: false },
];

function renderTasks() {
    const listContainer = document.getElementById('taskList');
    listContainer.innerHTML = '';

    const sortedTasks = [...tasks].sort((a, b) => a.completada - b.completada);

    sortedTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task);

        const li = document.createElement('li');
        li.className = `task-item ${task.completada ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${originalIndex})">
                <input type="checkbox" ${task.completada ? 'checked' : ''} onclick="event.stopPropagation(); toggleTask(${originalIndex})">
                <span>${task.descripcion}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${originalIndex})">🗑</button>
        `;
        listContainer.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text !== "") {
        tasks.unshift({ descripcion: text, completada: false });
        input.value = '';
        renderTasks();
    }
}

function handleTaskKey(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function toggleTask(index) {
    tasks[index].completada = !tasks[index].completada;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

window.onload = function() {
    initDateSelectors();
    renderTasks();
};