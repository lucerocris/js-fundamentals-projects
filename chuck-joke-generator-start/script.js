const joke = document.getElementById('joke');
const jokeBtn = document.getElementById('joke-btn');

jokeBtn.addEventListener('click', getJoke);
document.addEventListener('DOMContentLoaded', getJoke);

function getJoke() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');
  xhr.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      const data = JSON.parse(this.responseText);
      joke.innerHTML = `${data.value}`;
    } else {
        joke.innerHTML = 'Something went wrong (Not Funny)'
    }
  };

  xhr.send();
}
