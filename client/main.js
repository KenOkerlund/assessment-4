const gratitudesContainer = document.getElementById("gratitude-container");
const gratitudeBtn = document.getElementById("add-gratitude");
const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/").then((res) => {
      const data = res.data;
      alert(data);
    });
  };
  
  const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/").then((res) => {
      const fortune = res.data;
      alert(fortune);
    });
  };


function getGratitudes() {
    return axios.get("http://localhost:4000/api/gratitude/")
}

function postGratitude(body) {
    return axios.post("http://localhost:4000/api/gratitude/", body)
                .then( () => getAndRenderGratitudes());
}

function modifyRating(id, math) {
    return axios.put("http://localhost:4000/api/gratitude/", {
        id,
        math
    })
    .then( () => {
        getAndRenderGratitudes();
    })
}

function deleteGratitude(gratitude){
    return axios.delete("http://localhost:4000/api/gratitude/", {
        data: {
            id: gratitude.id
        }
    })
    .then( () => {
        getAndRenderGratitudes();
    })
}

function decrementGratitude(gratitude){
    modifyRating(gratitude.id, "minus")
}

function incrementGratitude(gratitude) {
    modifyRating(gratitude.id, "plus")
}

function getAndRenderGratitudes() {
    getGratitudes().then(res => {
        gratitudesContainer.innerHTML = '';
        res.data.forEach(gratitude => {
            const div = document.createElement('div');
            const name = document.createElement('div');
            name.innerText = gratitude.text;

            const rating = document.createElement('div');
            rating.innerText = gratitude.gratefulRating;

            const decrementButton = document.createElement('button');
            decrementButton.innerText = "-";
            decrementButton.addEventListener('click', () => decrementGratitude(gratitude));

            const incrementButton = document.createElement('button');
            incrementButton.innerText = "+"
            incrementButton.addEventListener('click', () => incrementGratitude(gratitude));

            const deleteButton = document.createElement('button');
            deleteButton.innerText = "I am no longer grateful for this"
            deleteButton.addEventListener('click', () => deleteGratitude(gratitude));

            div.appendChild(name);
            div.appendChild(rating);
            div.appendChild(decrementButton);
            div.appendChild(incrementButton);
            div.appendChild(deleteButton);

            gratitudesContainer.appendChild(div);
        });
    })
}

function addGratitude() {
  const gratitudeInput = document.getElementById("user-input");
  const gratitudeRating = document.getElementById("grateful-rating");

  const body = {
    text: gratitudeInput.value,
    gratefulRating: Number(gratitudeRating.value)
  }
  postGratitude(body).then( () => {
    gratitudeInput.value = ''
    gratitudeRating.value = ''
  })
}

getAndRenderGratitudes();
gratitudeBtn.addEventListener("click", addGratitude)
complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);