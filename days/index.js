const now = moment();

const calendar = (containerEl) => {
  let selectedDate = null;
  const renderCalendar = () => {
    const startOfMonth = moment(now).startOf('month');
    const endOfMonth = moment(now).endOf('month');

    const monthName = now.format('MMMM');
    const year = now.format('YYYY');

    const calendarHeader = `
      <div class="calendar-header">
        <button id="prev-month">&lt;</button>
        <div>${monthName} ${year}</div>
        <button id="next-month">&gt;</button>
      </div>
    `;

    const calendarDays = `
      <div class="calendar-days">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
    `;

    const calendarDates = [];
    let cells = [];

    for (let date = moment(startOfMonth); date <= endOfMonth; date.add(1, 'day')) {
      const day = date.date();
      const isToday = date.isSame(moment(), 'day');
      const isSelected = date.isSame(selectedDate, 'day');
      const isPast = date.isBefore(moment(), 'day');

      cells.push(`
        <div
          class="calendar-date${isToday ? ' calendar-date-today' : ''}${isSelected ? ' calendar-date-selected' : ''}${isPast ? ' calendar-date-past' : ''}"
          data-date="${date.format('YYYY-MM-DD')}"
        >
          ${day}
        </div>
      `);

      if (date.day() === 6) {
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
            console.log(`Selected date: ${date.format('MMMM D, YYYY')}`);
          }
        });
      });
      

    containerEl.querySelector('#prev-month').addEventListener('click', () => {
      now.subtract(1, 'month');
      renderCalendar();
    });

    containerEl.querySelector('#next-month').addEventListener('click', () => {
      now.add(1, 'month');
      renderCalendar();
    });
  };

  renderCalendar();

  return {
    getSelectedDate: () => selectedDate,
  };
};
