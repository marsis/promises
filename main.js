
///// CALLBACKS

function getColor(callback) {
    var colors = ['синий', 'желтый', 'голубой', 'красный', 'зеленый', 'фиолетовый', 'коричневый', 'белый', 'оранжевый', 'лиловый'];
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    var time = rand(1000, 5000);
    setTimeout(function () {
        callback('Цвет: '+ newColor);
    }, time);

}

  function getName(callback) {
    var names = ['Иван', 'Сергей', 'Алексей', 'Петр', 'Семен', 'Вениамин', 'Константин', 'Кирилл'];
    var newName = names[Math.floor(Math.random() * names.length)];
    var time = rand(1000, 5000);
    setTimeout(function () {
         callback('Имя: '+ newName);
     }, time);
  }


 function getNumber(min, max, callback) {
    var newNumber =  Math.floor(Math.random() * (max - min)) + min;
    var time = rand(1000, 5000);
    setTimeout(function () {
        callback('Номер: '+ newNumber);
    }, time);
 }


function getServer(callback) {
    let arr = [];
    let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
    requestPromise.then((response) => {
        let dataPromise = response.json();
        dataPromise.then((data) => {
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i].title);
            }
            callback('Title: ' + arr);
        })
    })
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
    getServer(callback);
}

function callback4(smth) {

    arr.push(smth);
    if (arr.length === 4) {
        console.log(arr);
        arr = [];

    }
}



///// NATIVE PROMISES

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

function getServerPromise() {
    let promise = new MyPromise((resolve) => {
        let arr =[];
        let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
        requestPromise.then((response) => {
            let dataPromise = response.json();
            dataPromise.then((data) => {
                for (let i = 0; i < data.length; i++) {
                    arr.push(data[i].title);
                }
                resolve('Title : ' + arr);
            })
        })
    });
    return promise;
}








////////////CUSTOM PROMISES

// functions for examples with custom promise
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
function MyPromise(fn) {
    // store state which can be PENDING, FULFILLED or REJECTED
    var state = PENDING;
    // store value once FULFILLED or REJECTED
    var value = null;
    // store sucess & failure handlers
    var handlers = [];
    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }
    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }
    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject);
                return
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }
    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state === REJECTED && typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }
    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function (value) {
                    if (done) return;
                    done = true;
                    onFulfilled(value)
                },
                function (reason) {
                    if (done) return;
                    done = true;
                    onRejected(reason)
                })
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex)
        }
    }
    this.done = function (onFulfilled, onRejected) {
        setTimeout(function () {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    };
    this.then = function (onFulfilled, onRejected) {
        var self = this;
        return new MyPromise(function (resolve, reject) {
            return self.done(function (result) {
                    if (typeof onFulfilled === 'function') {
                        try {
                            return resolve(onFulfilled(result));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return resolve(result);
                    }
                },
                function (error) {
                    if (typeof onRejected === 'function') {
                        try {
                            return resolve(onRejected(error));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return reject(error);
                    }
                });
        });
    };
    doResolve(fn, resolve, reject);
    MyPromise.all = function (arrPromise) {
        var arr = [];
        var ready = new MyPromise((resolve) => { return resolve(null)});
        arrPromise.forEach(function (promise) {
            ready = ready.then(function () {
                return promise;
            }).then(function (value) {
                arr.push(value);
            });
        });
        return ready.then(function () { return arr; });
    }
}




function getNameCustomPromise() {
    let promise = new MyPromise((resolve) => {
        let names = ['Иван', 'Сергей', 'Алексей', 'Петр', 'Семен', 'Вениамин', 'Константин', 'Кирилл'];
        var newName = names[Math.floor(Math.random() * names.length)];
        var time = rand(1000, 5000);
        setTimeout(function () {
            resolve('Имя: ' + newName);
        }, time);
    });
    return promise;
}

function getColorCustomPromise() {
    let promise = new MyPromise((resolve) => {
        let colors = ['синий', 'желтый', 'голубой', 'красный', 'зеленый', 'фиолетовый', 'коричневый', 'белый', 'оранжевый', 'лиловый'];
        let time = rand(1000, 5000);
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        setTimeout(function () {
            resolve('Цвет: ' + newColor);
        }, time);
    });
   return promise;
}

function getNumberCustomPromise(min, max) {
    let promise = new MyPromise((resolve) =>{
        var newNumber =  Math.floor(Math.random() * (max - min)) + min;
        var time = rand(1000, 5000);
        setTimeout(function () {
            resolve('Число: ' + newNumber);
        }, time);
    });
    return promise;
}


function getServerCustomPromise() {
    let promise = new MyPromise((resolve) => {
        let arr =[];
        let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
        requestPromise.then((response) => {
            let dataPromise = response.json();
            dataPromise.then((data) => {
                for (let i = 0; i < data.length; i++) {
                    arr.push(data[i].title);
                }
                resolve('Title : ' + arr);
            })
        })
    });
    return promise;
}




first.onclick = function() {
        getColor(callback);
        getName(callback);
        getNumber(0, 500, callback);
        getServer(callback);
};

second.onclick = function () {
        getColor(callback4);
        getName(callback4);
        getNumber(0, 500, callback4);
        getServer(callback4);
     };

third.onclick = function() {
    getName(callback3);
};


fourth.onclick = function () {
    getColorPromise().then(callback);
    getNamePromise().then(callback);
    getNumberPromise(0, 500).then(callback);
    getServerPromise().then(callback);
};

fifth.onclick = function () {
    Promise.all([getNamePromise(), getColorPromise(), getNumberPromise(0, 500), getServerPromise()])
        .then(values => {console.log(values)});
};

sixth.onclick = function () {
    getNamePromise()
       .then((newName) => {console.log(newName); return getColorPromise() })
       .then((newColor) => {console.log(newColor); return getNumberPromise(0, 50) })
       .then((arr)=> {console.log(arr); return getServerPromise()})
       .then((newNumber) => console.log(newNumber));
};


 seventh.onclick = function () {
    getColorCustomPromise().then(callback);
    getNameCustomPromise().then(callback);
    getNumberCustomPromise(0, 500).then(callback);
    getServerCustomPromise().then(callback);
};


eighth.onclick = function () {
    getColorCustomPromise().then(callback4);
    getNameCustomPromise().then(callback4);
    getNumberCustomPromise(0, 500).then(callback4);
    getServerCustomPromise().then(callback4);
};



ninth.onclick = function () {
        let arrPromise = [ getNameCustomPromise(),  getNumberCustomPromise(0, 500), getColorCustomPromise(),getServerCustomPromise()];
        MyPromise.all(arrPromise).then((promiseArray) => {
            promiseArray.forEach((item) => {
                if (typeof item === 'object') {
                    item.forEach((elem) => { console.log(elem)});
                } else {
                    console.log(item);
                }
            });
        });
};



