const calendar = (containerEl) => {
    let selectedDate = null;
    let currentMonth = moment();
    
    const renderCalendar = () => {
      const startOfMonth = moment(currentMonth).startOf('month');
      const endOfMonth = moment(currentMonth).endOf('month');
      const daysInMonth = endOfMonth.date();
  
      const monthName = currentMonth.format('MMMM');
      const year = currentMonth.format('YYYY');
  
      const calendarHeader = `
        <div class="calendar-header">
          <button id="prev-month">&lt;</button>
          <div>${monthName} ${year}</div>
          <button id="next-month">&gt;</button>
        </div>
      `;

      const calendarDays = `
      <div class="calendar-days">
        <div class="calendar-day">Sun</div>
        <div class="calendar-day">Mon</div>
        <div class="calendar-day">Tue</div>
        <div class="calendar-day">Wed</div>
        <div class="calendar-day">Thu</div>
        <div class="calendar-day">Fri</div>
        <div class="calendar-day">Sat</div>
      </div>
    `;
    

    const calendarDates = [];
    let cells = [];

    for (let date = moment(startOfMonth); date <= endOfMonth; date.add(1, 'day')) {
        const day = date.date();
        const isToday = date.isSame(moment(), 'day');
        const isSelected = date.isSame(selectedDate, 'day');
        const isPast = date.isBefore(moment(), 'day');
    
        if (date.date() === 1) {
            // Add empty cells for days before the first day of the month
            const emptyCells = date.day();
            for (let i = 0; i < emptyCells; i++) {
                cells.push(`
                    <div class="calendar-date calendar-date-empty"></div>
                `);
            }
        }
    
        cells.push(`
            <div
                class="calendar-date${isToday ? ' calendar-date-today' : ''}${isSelected ? ' calendar-date-selected' : ''}${isPast ? ' calendar-date-past' : ''}"
                data-date="${date.format('YYYY-MM-DD')}"
            >
                ${day}
            </div>
        `);
    
        if (date.day() === 6 || day === daysInMonth) {
            calendarDates.push(`<div class="calendar-row">${cells.join('')}</div>`);
            cells = [];
        }
    }
    
    const calendarDatesHtml = calendarDates.join('');

    const calendarHtml = `
      <div class="calendar">
        ${calendarHeader}
        ${calendarDays}
        ${calendarDatesHtml}
      </div>
    `;

    containerEl.innerHTML = calendarHtml;
    containerEl.querySelectorAll('.calendar-date').forEach((dateEl) => {
      dateEl.addEventListener('click', () => {
        const date = moment(dateEl.getAttribute('data-date'));
        if (date.isSameOrAfter(moment(), 'day')) {
          selectedDate = date;
          renderCalendar();


          
      
            // Create a new container for the 24-hour schedule
            const scheduleContainer = document.createElement('div');
            scheduleContainer.classList.add('schedule-container');
            containerEl.appendChild(scheduleContainer);
      
            // Create a string with 24 time slots for the schedule
         // Create a string with 24 time slots for the schedule
         let scheduleHtml = '<div class="schedule-header">Select a time slot:</div>';
         let amScheduleHtml = '';
         let pmScheduleHtml = '';
         for (let i = 0; i < 24; i++) {
           const timeSlotStart = moment({ hour: i });
           const timeSlotEnd = moment({ hour: i + 1 });
           const isPast = timeSlotStart.isBefore(moment(), 'hour');
           const isSelected = false; // You could add logic to check if this time slot is currently selected
           const timeSlotHtml = `
             <div class="schedule-time-slot${isSelected ? ' schedule-time-slot-selected' : ''}${isPast ? ' schedule-time-slot-past' : ''}"
               data-date="${date.format('YYYY-MM-DD')}" data-time="${timeSlotStart.format('HH:mm')}">
               ${timeSlotStart.format('h A')} - ${timeSlotEnd.format('h A')}
             </div>
           `;
           if (i < 12) {
             amScheduleHtml += timeSlotHtml;
           } else {
             pmScheduleHtml += timeSlotHtml;
           }
         }
         
         // Set the inner HTML of the new container to the schedule HTML
         scheduleHtml += `
           <div class="schedule-columns">
             <div class="schedule-column1">${amScheduleHtml}</div>
             <div class="schedule-column2">${pmScheduleHtml}</div>
           </div>
         `;
         
      
            // Set the inner HTML of the new container to the schedule HTML
            scheduleContainer.innerHTML = scheduleHtml;
          

            // Add click event listeners to each time slot
            scheduleContainer.querySelectorAll('.schedule-time-slot').forEach((timeSlotEl) => {
              timeSlotEl.addEventListener('click', () => {

                const selectedTimeSlotEl = scheduleContainer.querySelector('.schedule-time-slot-selected');
                if (selectedTimeSlotEl) {
                  selectedTimeSlotEl.classList.remove('schedule-time-slot-selected');
                }
                timeSlotEl.classList.add('schedule-time-slot-selected');


                const date = moment(timeSlotEl.getAttribute('data-date'));
                const time = moment(timeSlotEl.getAttribute('data-time'), 'HH:mm');
                const dateTime = moment({ year: date.year(), month: date.month(), date: date.date(), hour: time.hour(), minute: time.minute() });
                const dateTimePlusOneHour = dateTime.clone().add(1, 'hour');
                const formattedDateTimeOneHour = dateTimePlusOneHour.local().format('MMMM D, YYYY h:mm A');

              
                console.log(`Selected date and time slot: ${dateTime.format('MMMM D, YYYY h:mm A')} -${formattedDateTimeOneHour} `);
                
            
                const dateTimeslot1 = dateTime.valueOf();
                console.log(`Datetime1 and time in UTC format in milliseconds: ${dateTimeslot1}`);

                const utcMoment = moment.utc(dateTimeslot1);
               
                const localMoment = utcMoment.local();
                const formattedDateTime = localMoment.format('MMMM D, YYYY h:mm A');
                
                // Log the result to the console
                console.log(`Formatted date and time: ${formattedDateTime}`);

            });
            });
          }
        });
        
      });
      
      

      const prevMonthBtn = containerEl.querySelector('#prev-month');
      prevMonthBtn.addEventListener('click', () => {
        currentMonth.subtract(1, 'month');
        renderCalendar();
      });
      
      const nextMonthBtn = containerEl.querySelector('#next-month');
      nextMonthBtn.addEventListener('click', () => {
        currentMonth.add(1, 'month');
        renderCalendar();
      });
    };
  
    renderCalendar();
  };
