class Position {

    constructor(lastName, firstName, age, education, desiredPosition) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.education = education;
        this.desiredPosition = desiredPosition;
    }

}

const switcher = document.querySelector(".switch input");
const positionsList = document.querySelector('#positions-list');
const statusText = document.querySelector('.status-label');
const registrationForm = document.querySelector("#registrationForm");


let internetStatus = switcher.checked;

if (internetStatus) {
    statusText.textContent = 'You are online';
} else {
    statusText.textContent = 'You are offline';
}


switcher.addEventListener('change', function () {
    internetStatus = switcher.checked
    
    if (internetStatus) {
        statusText.textContent = 'You are online';
        const positionsFromLocalStorage = localStorage.getItem("positions");
        showPositions(positionsFromLocalStorage);
        localStorage.removeItem("positions");

    } else {
        statusText.textContent = 'You are offline';
    }
   
});


registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { value: lastName } = e.target.elements['lastName'];
    const { value: firstName } = e.target.elements['firstName'];
    const { value: age } = e.target.elements['age'];
    const { value: education } = e.target.elements['education'];
    const { value: desiredPosition } = e.target.elements['desiredPosition'];

    const newVac = new Position(lastName, firstName, age, education, desiredPosition);

    if (internetStatus) {
        // send to server
        showPositions(JSON.stringify([newVac]));
    } else {
        const positions = JSON.parse(localStorage.getItem("positions")) || [];
        positions.push(newVac);
        localStorage.setItem("positions", JSON.stringify(positions));
    }

    e.target.elements['lastName'].value = '';
    e.target.elements['firstName'].value = '';
    e.target.elements['age'].value = '';
    e.target.elements['education'].value = '';
    e.target.elements['desiredPosition'].value = '';

})


const showPositions = (positions) => {
    const list = JSON.parse(positions);
    list && list.length && list.forEach(pos => {
        const liEl = `${pos.lastName} ${pos.firstName} in the age of ${pos.age} with ${pos.education} wants ${pos.desiredPosition}`
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(liEl));
        positionsList.appendChild(li);
    })
  
}