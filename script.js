// Function to get current time and update the clock
function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${hours % 12 || 12}:${padZeroes(minutes)}:${padZeroes(seconds)} ${ampm}`;
    document.getElementById('current-time').textContent = formattedTime;

    // Check if any alarms match the current time
    const alarms = document.getElementsByClassName('alarm');
    for (let i = 0; i < alarms.length; i++) {
      const alarmTime = alarms[i].getAttribute('data-time');
      if (alarmTime === formattedTime) {
        alert('Alarm!');
        // Remove the alarm from the list
        alarms[i].remove();
      }
    }

    // Schedule the next update in 1 second
    setTimeout(updateTime, 1000);
  }

  // Function to add leading zeroes to single-digit numbers
  function padZeroes(num) {
    return num.toString().padStart(2, '0');
  }

  // Function to handle the "Set Alarm" button click event
  function setAlarm() {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const second = document.getElementById('second').value;
    const ampm = document.getElementById('ampm').value;

    const formattedTime = `${hour}:${padZeroes(minute)}:${padZeroes(second)} ${ampm}`;

    const alarmItem = document.createElement('li');
    alarmItem.className = 'list-group-item alarm';
    alarmItem.setAttribute('data-time', formattedTime);
    alarmItem.textContent = formattedTime;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right ml-2';
    deleteButton.textContent = 'Delete';

    // Event listener for delete button click event
    deleteButton.addEventListener('click', function() {
      const listItem = this.parentNode;
      const alarmsList = listItem.parentNode;
      alarmsList.removeChild(listItem);
    });

    alarmItem.appendChild(deleteButton);

    const alarmsList = document.getElementById('alarms-list');
    alarmsList.appendChild(alarmItem);
  }

  // Add event listener for the "Set Alarm" button click
  const setAlarmBtn = document.getElementById('set-alarm-btn');
  setAlarmBtn.addEventListener('click', setAlarm);

  // Start the clock
  updateTime();