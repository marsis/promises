function getColor(callback) {
    var colors = ['синий', 'желтый', 'голубой', 'красный', 'зеленый', 'фиолетовый', 'коричневый', 'белый', 'оранжевый', 'лиловый'];
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    var time = rand(1000, 5000);
    setTimeout(function () {
        callback(newColor);
    }, time);

}

  function getName(callback) {
    var names = ['Иван', 'Сергей', 'Алексей', 'Петр', 'Семен', 'Вениамин', 'Константин', 'Кирилл'];
    var newName = names[Math.floor(Math.random() * names.length)];
    var time = rand(1000, 5000);
    setTimeout(function () {
         callback(newName);
     }, time);
  }


 function getNumber(min, max, callback) {
    var newNumber =  Math.floor(Math.random() * (max - min)) + min;
    var time = rand(1000, 5000);
    setTimeout(function () {
        callback(newNumber);
    }, time);
 }



function callback(smth) {
    return (console.log(smth));
}

var arr = [];

function callback2(smth) {

    arr.push(smth);
   if (arr.length === 3) {
       console.log(arr);
       arr = [];

   }
}


function rand(min, max){
    return (max-min)*Math.random()+min;
}

function callback3(smth) {
    console.log(smth);
    getColor(callback);
    getNumber(0, 500, callback);
}
function callback4(smth) {
    console.log(smth);
    getNumber(0, 500, callback);

}



let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');

requestPromise.then((response) => {
   // console.log(requestPromise);
    let dataPromise = response.json();

    dataPromise.then((data) => {

    })
});







function getNamePromise() {
   let promise = new Promise((resolve) => {
        var names = ['Иван', 'Сергей', 'Алексей', 'Петр', 'Семен', 'Вениамин', 'Константин', 'Кирилл'];
        var newName = names[Math.floor(Math.random() * names.length)];
        var time = rand(1000, 5000);
        setTimeout(function () {
            resolve("Имя: " + newName);
        }, time);
    });
    return promise;
}



function getColorPromise(){
    let promise = new Promise((resolve) => {
        var colors = ['синий', 'желтый', 'голубой', 'красный', 'зеленый', 'фиолетовый', 'коричневый', 'белый', 'оранжевый', 'лиловый'];
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        var time = rand(1000, 5000);
        setTimeout(function () {
            resolve("Цвет: " + newColor);
        }, time);
    });
   return promise;
}


function getNumberPromise(min, max) {
    let promise = new Promise((resolve) => {
        var newNumber = Math.floor(Math.random() * (max - min)) + min;
        var time = rand(1000, 5000);
        setTimeout(function () {

            resolve("Число: " + newNumber);
        }, time);
    });
    return promise;
}






function getColorCustomPromise(resolve) {
    let colors = ['синий', 'желтый', 'голубой', 'красный', 'зеленый', 'фиолетовый', 'коричневый', 'белый', 'оранжевый', 'лиловый'];
    let time = rand(1000, 5000);
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(function () {

        resolve('Цвет: ' + newColor);
    }, time);
}



function getNameCustomPromise(resolve) {
    let names = ['Иван', 'Сергей', 'Алексей', 'Петр', 'Семен', 'Вениамин', 'Константин', 'Кирилл'];
    let newName = names[Math.floor(Math.random() * names.length)];
    let time = rand(1000, 5000);
    setTimeout(function () {
        resolve('Имя:' + newName);
    }, time);
}

function getNumberCustomPromise(min, max, resolve) {
    var newNumber =  Math.floor(Math.random() * (max - min)) + min;
    var time = rand(1000, 5000);
    setTimeout(function () {
        resolve('Число: ' + newNumber);
    }, time);
}







first.onclick = function() {
        getColor(callback);
        getName(callback);
        getNumber(0, 500, callback);
};
second.onclick = function () {
        getColor(callback2);
        getName(callback2);
        getNumber(0, 500, callback2);
     };
third.onclick = function() {
    getName(callback3);

};


fourth.onclick = function () {
    getColorPromise().then(callback);
    getNamePromise().then(callback);
    getNumberPromise(0, 500).then(callback);
};

sixth.onclick = function () {
    getNamePromise()
       .then((newName) => {console.log(newName); return getColorPromise() })
       .then((newColor) => {console.log(newColor); return getNumberPromise(0, 50) })
        .then((newNumber) => console.log(newNumber));
      // .then((callback2)=> {return getColorPromise() })
       //.then((callback2)=> {return getNumberPromise(0, 500)})
       //.then((callback2));




};

fifth.onclick = function () {

    /*getNamePromise().then(callback2);
    getColorPromise().then(callback2);
    getNumberPromise(0, 500).then(callback2);*/
    Promise.all([getNamePromise(), getColorPromise(), getNumberPromise(0, 500)])
        .then(values => {console.log(values)});
 };

/*getHero()
    .then((hero) => { console.log(hero); return getColor() })
    .then((color)=> { console.log(color); return getNumber() })
    .then((num)=>console.log(num));
    */
seventh.onclick = function () {

    getColorCustomPromise(callback);
    getNameCustomPromise(callback);
    getNumberCustomPromise(0, 500, callback);

};
