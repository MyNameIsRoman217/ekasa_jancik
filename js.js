
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  const scrollAmount = () => track.clientWidth;

  nextBtn.onclick = () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  };

  prevBtn.onclick = () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  };

  // Drag support
  let isDown = false;
  let startX, scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

      const days = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
  const todayIndex = new Date().getDay();
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const rows = document.querySelectorAll('.hours-table tr');
  const statusEl = document.getElementById('status');

  let isOpen = false;
  let nextOpenDay = null;
  let nextOpenTime = null;

  rows.forEach((row, index) => {
    const dayName = row.cells[0].textContent.trim();
    const hoursText = row.cells[1].textContent.trim();

    if (dayName === days[todayIndex]) {
      row.classList.add('today');

      if (hoursText.toLowerCase() !== 'zatvorené') {
        const [open, close] = hoursText.split('–').map(t => {
          const [h, m] = t.trim().split(':').map(Number);
          return h * 60 + m;
        });

        if (currentTime >= open && currentTime < close) {
          isOpen = true;
        } else {
          nextOpenDay = todayIndex;
          nextOpenTime = open;
        }
      }
    }
  });
