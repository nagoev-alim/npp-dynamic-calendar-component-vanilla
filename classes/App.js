import feather from 'feather-icons';

/**
 * @class App
 */
export default class App {
  constructor(root) {
    this.root = root;
    this.date = new Date();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth();
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.root.innerHTML = `
      <h3 class='title'>Dynamic Calendar</h3>
      <div class='content'>
        <header>
          <p class='h4' data-currentDate=''>January 2023</p>
          <div>
            <button data-control='prev'>${feather.icons['chevron-left'].toSvg()}</button>
            <button data-control='next'>${feather.icons['chevron-right'].toSvg()}</button>
          </div>
        </header>
        <div>
          <ul>${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(m => `<li class='h5'>${m}</li>`).join('')}</ul>
          <ul data-days=''></ul>
        </div>
      </div>
    `;

    this.DOM = {
      days: document.querySelector('[data-days]'),
      currentDate: document.querySelector('[data-currentDate]'),
      controls: document.querySelectorAll('[data-control]'),
    };

    this.render();
    this.DOM.controls.forEach(icon => icon.addEventListener('click', this.onClick));
  }

  /**
   * @function onClick - Buttons click event handler
   * @param target
   */
  onClick = ({ target }) => {
    this.currMonth = target.dataset.control === 'prev' ? this.currMonth - 1 : this.currMonth + 1;

    if (this.currMonth < 0 || this.currMonth > 11) {
      this.date = new Date(this.currYear, this.currMonth);
      this.currYear = this.date.getFullYear();
      this.currMonth = this.date.getMonth();
    } else {
      this.date = new Date();
    }

    this.render();
  };

  /**
   * @function render - Render calendar
   */
  render = () => {
    let firstDayOfMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    let lastDateOfMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(this.currYear, this.currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
    let tag = '';

    for (let i = firstDayOfMonth; i > 0; i--) {
      tag += `<li class='h5 inactive'>${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      tag += `<li class='h5 ${i === this.date.getDate() && this.currMonth === new Date().getMonth() && this.currYear === new Date().getFullYear() ? 'active' : ''}'>${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      tag += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`;
    }

    this.DOM.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
    this.DOM.days.innerHTML = tag;
  };
}
