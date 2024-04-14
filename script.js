const btnPomodoro = document.querySelector('#pomodoro');
const btnBreak = document.querySelector('#break');
const btnStart = document.querySelector('#start');
const btnReset = document.querySelector('#reset');
const pomodoroTime = document.querySelector('#pomodoro-time');
let timerId;

btnPomodoro.addEventListener('click', function() {
  if (!btnPomodoro.classList.contains('active')) {
    clearInterval(timerId);
    btnPomodoro.classList.add('active');
    btnBreak.classList.remove('active');

    pomodoroTime.textContent = '25:00';
    btnStart.textContent = 'start';
  }
});

btnBreak.addEventListener('click', function() {
  if (!btnBreak.classList.contains('active')) {
    clearInterval(timerId);
    btnBreak.classList.add('active');
    btnPomodoro.classList.remove('active');

    pomodoroTime.textContent = '05:00';
    btnStart.textContent = 'start';
  }
});

btnReset.addEventListener('click', function() {
  if (btnBreak.classList.contains('active')) {
    pomodoroTime.textContent = '05:00';
  } else {
    pomodoroTime.textContent = '25:00';
  }
  clearInterval(timerId);
  btnStart.textContent = 'start';
});

btnStart.addEventListener('click', function() {
    clearInterval(timerId);

    if (btnStart.textContent === 'start') {
      btnStart.textContent = 'stop';
      timerId = setInterval(() => {
        const timerData = pomodoroTime.textContent.split(':');
        const minutesString = timerData[0];
        const secondsString = timerData[1];
          
        let minutes = parseInt(minutesString);
        let seconds = parseInt(secondsString);
        
        seconds--;
        if (seconds < 0) {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            clearInterval(timerId);
            btnStart.textContent = 'start';

              if (btnBreak.classList.contains('active')) {
                  pomodoroTime.textContent = '05:00';
              } else {
                  pomodoroTime.textContent = '25:00';
              }
            return;
          }
        }

        const timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        pomodoroTime.textContent = timeString;
    }, 10);
    } else {
      clearInterval(timerId);
      btnStart.textContent = 'start';
    }
});