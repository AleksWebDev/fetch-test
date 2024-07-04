const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = validateForm();
    console.log(`res ${res}`);
    /* if(res){
        e.preventDefault();
        return
    }

    postData(res); */
})

const validateForm = () => {
    const inputs = document.getElementsByTagName('input');

    const regExp = {
        name: /^[а-яА-ЯёЁa-zA-Z]+( [а-яА-ЯёЁa-zA-Z]+)*$/,
        email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        phone: /(\+7|8)?\d{10}/,
    }

    const userData = [];

    Array.from(inputs).forEach((item) => {
        if(item.className === 'name'){
            const name = checkInputName(item, item.value, regExp.name);
            userData.push(name);
        }else if(item.className === 'email'){
            const email = checkInputEmail(item, item.value, regExp.email);
            userData.push(email);
        }else if(item.className === 'phone'){
            const phone = checkInputPhone(item, item.value, regExp.phone);
            userData.push(phone);
        }
    })

    return userData;
}

// необходим рефакторинг, слишком много повторяющегося кода
function checkInputName(item, value, name){
    let errorMessage = item.nextElementSibling;
    const isValid = name.test(value.trim());
    
    if(!isValid){
        console.log('fucked up');
        errorMessage.classList.add('show-error');
        errorMessage.innerText = 'Введите корректное имя пользователя!!!';
    }else{
        console.log('validate succeccfully');
        errorMessage.classList.remove('show-error');
        errorMessage.innerText = '';
        return item.value;
    }
}

function checkInputEmail(item, value, email){
    const isValid = email.test(value.trim());
    let errorMessage = item.nextElementSibling;

    if(!isValid){
        console.log('fucked up');
        errorMessage.classList.add('show-error');
        errorMessage.innerText = 'Введите корректный email адресс!!!';
    }else{
        console.log('validate succeccfully');
        errorMessage.classList.remove('show-error');
        errorMessage.innerText = '';
        return item.value;
    }
}

function checkInputPhone(item, value, phone){
    const isValid = phone.test(value.trim());
    let errorMessage = item.nextElementSibling;
    
    if(!isValid){
        console.log('fucked up');
        errorMessage.classList.add('show-error');
        errorMessage.innerText = 'Введите корректный номер телефона!!!';
    }else{
        console.log('validate succeccfully');
        errorMessage.classList.remove('show-error');
        errorMessage.innerText = '';
        return item.value;
    }
}



function postData(data){
    const [name, email, phone] = data;

    fetch('http://localhost:3000/persons', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            id: generateID()
        }),
    })
}

function generateID(){
    return Math.floor(Math.random() * (10000 - 1) + 1);
}