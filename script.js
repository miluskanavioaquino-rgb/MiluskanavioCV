const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  siteNav?.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
  });
});

const filters = document.querySelectorAll('.filter-button');
const courses = document.querySelectorAll('.course');
const courseList = document.querySelector('#course-list');
const toggleCourses = document.querySelector('#toggle-courses');

function applyCourseFilter(category) {
  courses.forEach((course) => {
    const isExtra = course.classList.contains('course-extra');
    const showExtra = isExtra && courseList.classList.contains('show-all');
    const matches = category === 'todos' || course.dataset.category === category || showExtra;
    course.hidden = !matches || (isExtra && !showExtra);
  });
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    applyCourseFilter(button.dataset.filter);
  });
});

toggleCourses?.addEventListener('click', () => {
  const expanded = toggleCourses.getAttribute('aria-expanded') === 'true';
  courseList.classList.toggle('show-all', !expanded);
  toggleCourses.setAttribute('aria-expanded', String(!expanded));
  toggleCourses.innerHTML = expanded
    ? 'Mostrar cursos complementarios <span aria-hidden="true">＋</span>'
    : 'Ocultar cursos complementarios <span aria-hidden="true">−</span>';
  const activeFilter = document.querySelector('.filter-button.is-active')?.dataset.filter ?? 'ambiental';
  applyCourseFilter(activeFilter);
});

applyCourseFilter('ambiental');
document.querySelector('#year').textContent = new Date().getFullYear();
