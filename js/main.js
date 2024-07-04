const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = validateForm();

    if(res.length === 3){
        postData(res);
    }
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
            if(name !== undefined){
                userData.push(name);
            }
        }else if(item.className === 'email'){
            const email = checkInputEmail(item, item.value, regExp.email);
            if(email !== undefined){
                userData.push(email);
            }
        }else if(item.className === 'phone'){
            const phone = checkInputPhone(item, item.value, regExp.phone);
            if(phone !== undefined){
                userData.push(phone);
            }
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
        return;
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
        return;
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
        return;
    }else{
        console.log('validate succeccfully');
        errorMessage.classList.remove('show-error');
        errorMessage.innerText = '';
        return item.value;
    }
}



async function postData(data){
    const [name, email, phone] = data;
    
    try{
        const response = await fetch('http://localhost:3000/persons', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            id: generateID(),
        })
    })
    if(response.ok) {
        console.log('Data succeccesfully posted to server')
        const data = await response.json();
    }else{
        throw new Error('Ошибка запроса')
    }
    }catch(error){
        console.log('Failed to post data', error.message)
    }

    function generateID(){
        return Math.floor(Math.random() * (1000000 - 1) + 1);
    }
}










