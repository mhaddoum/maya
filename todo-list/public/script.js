document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const tasks = document.getElementById('tasks');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const selectedDate = document.getElementById('selected-date');
  
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
  
    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
    // Générer le calendrier pour 2025
    function generateCalendar(year) {
        months.forEach((month, monthIndex) => {
            const monthContainer = document.createElement('div');
            monthContainer.className = 'month-container';
  
            const monthTitle = document.createElement('div');
            monthTitle.className = 'month-title';
            monthTitle.textContent = month;
            monthContainer.appendChild(monthTitle);
  
            // Ajouter les jours de la semaine
            daysOfWeek.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'day header';
                dayHeader.textContent = day;
                monthContainer.appendChild(dayHeader);
            });
  
            // Ajouter les jours du mois
            const firstDay = new Date(year, monthIndex, 1).getDay();
            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
            const offset = (firstDay === 0 ? 6 : firstDay - 1);
  
            for (let i = 0; i < offset; i++) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'day empty';
                monthContainer.appendChild(emptyDiv);
            }
  
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day';
                dayDiv.textContent = day;
                dayDiv.addEventListener('click', () => loadTasks(year, monthIndex + 1, day));
                monthContainer.appendChild(dayDiv);
            }
  
            calendar.appendChild(monthContainer);
        });
    }
  
    // Charger les tâches pour une date spécifique
    function loadTasks(year, month, day) {
        const dateKey = `${year}-${month}-${day}`;
        selectedDate.textContent = `${day}/${month}/${year}`;
        tasks.innerHTML = '';
  
        const savedTasks = JSON.parse(localStorage.getItem(dateKey)) || [];
        savedTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            tasks.appendChild(li);
        });
    }
  
    // Ajouter une nouvelle tâche
    addTaskButton.addEventListener('click', () => {
        const task = newTaskInput.value.trim();
        if (!task) return;
  
        const date = selectedDate.textContent.split('/');
        if (date.length < 3) {
            alert('Veuillez sélectionner une date.');
            return;
        }
  
        const dateKey = `${date[2]}-${date[1]}-${date[0]}`;
        const savedTasks = JSON.parse(localStorage.getItem(dateKey)) || [];
        savedTasks.push(task);
        localStorage.setItem(dateKey, JSON.stringify(savedTasks));
  
        newTaskInput.value = '';
        loadTasks(date[2], date[1], date[0]);
    });
  
    generateCalendar(2025);
  });
  