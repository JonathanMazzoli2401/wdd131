const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function () {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');

    const deleteButton = document.createElement('button');

    li.textContent = input.value;

    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    li.append(deleteButton);

    list.append(li);
  }

  list.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    list.removeChild(li);
    input.focus();
  }
});

  input.value = '';
  input.focus();
});



