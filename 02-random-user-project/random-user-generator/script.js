const generateBtn = document.getElementById('generate');

generateBtn.addEventListener('click', fetchUser);

function fetchUser() {
  showSpinner();
  fetch('https://randomuser.me/api/')
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      displayData(data.results[0]);
    });
}

function displayData(user) {
  console.log(user.gender);
  if (user.gender === 'female') {
    document.body.style.backgroundColor = 'rebeccapurple';
  } else {
    document.body.style.backgroundColor = 'steelblue';
  }

  const userDiv = document.querySelector('#user');
  userDiv.innerHTML = `<div id="user" class="mt-6">
         <div class="flex justify-between">
          <div class="flex">
            <img
              class="w-48 h-48 rounded-full mr-8"
              src="${user.picture.medium}"
            />
            <div class="space-y-3">
              <p class="text-xl">
                <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
              </p>
              <p class="text-xl">
                <span class="font-bold">Email: </span> ${user.email}
              </p>
              <p class="text-xl">
                <span class="font-bold">Phone: </span> ${user.phone}
              </p>
              <p class="text-xl">
                <span class="font-bold">Location: </span> ${user.location.country} ${user.location.state} ${user.location.city}
              </p>
              <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function showSpinner() {
  document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
  document.querySelector('.spinner').style.display = 'none';
}
