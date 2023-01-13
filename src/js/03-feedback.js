import throttle from 'lodash.throttle';
const formFIeld = document.querySelector('.feedback-form');
const mailField = document.querySelector('[name="email"]');
const textField = document.querySelector('[name="message"]');
const savedData = [];
const data = {};
console.log(new Date());
formFIeld.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.target.value);
  savedData.push(data);
  localStorage.clear();
  e.target.reset();
  console.log(savedData);
});
formFIeld.addEventListener(
  'input',
  throttle(e => {
    const {
      email: { value: mailValue },
      message: { value: msgValue },
    } = formFIeld;
    data.email = mailValue;
    data.message = msgValue;
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }, 500)
);
if (localStorage.getItem('feedback-form-state')) {
  const parsedField = JSON.parse(localStorage.getItem('feedback-form-state'));
  mailField.value = parsedField.email;
  textField.value = parsedField.message;
} else {
  mailField.value = '';
  textField.value = '';
}
