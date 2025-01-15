document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: '/tasks', // Récupère les tâches de l'API
      dateClick: function(info) {
        alert('Vous avez cliqué sur : ' + info.dateStr);
        // Rediriger vers une page spécifique ou ouvrir un modal pour ajouter des tâches
      }
    });
  
    calendar.render();
  });
  