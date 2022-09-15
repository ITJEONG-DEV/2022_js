### Promises

- 어떤 작업의 중간상태를 나타내는 오브젝트
- 작업이 완료되어 결과를 반환해주는 정확한 시간을 보장해주지는 않지만, 사용할 수 있는 결과를 반환했을 때 프로그래머의 의도대로 다음 코드를 진행시키거나, 에러가 발생했을 때 에러를 처리할 수 있음
- 비동기 작업 순서가 정확하게 작동되도록 도움을 줌
<br>
- 비디오 채팅 애플리케이션 코드
```
function handleCallButton(evt) {
    setStatusMessage("Calling...");
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(chatStream => {
        selfViewElem.srcObject = chatStream;
        chatStream.getTracks().forEach(
            track => myPeerConnection.addTrack(track, chatStream)
        );
        setStatusMessage("Connected");
    }).catch(err => {
        setStatusMessage("Failed to connect");
    })
}
```
<br>

### The trouble with callbacks
```
chooseToppings(function(topping) {
    placeOrder(toppings, function(order) {
        collectOrder(order, function(pizza) {
            eatPizza(pizza);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);
```
- 코드 가독성 문제 (콜백 지옥)
- `failureCallback()`을 여러 번 작성해야 함
<br>

### Improvements with Promises
- callback 대신 비동기 Primise 를 사용
```
chooseToppings()
    .then(function(toppings) {
        return placeOrder(toppings);
    })
    .then(function order) {
        return collectOrder(order);
    })
    .then(function(pizza) {
        eatPizza(pizza);
    })
    .catch(failureCallback);
```
- 코드 가독성 O
- 한 개의 `.catch()`를 사용하여 모든 에러를 처리
- main thread를 차단하지 않음
- 여러 개의 비동기 작업을 연쇄적으로 처리할 수 있음
    => `.then()` 블럭은 자신이 속한 블럭의 작업이 끝났을 때의 결과를 새로운 Promise로 반환
<br>
- 화살표 함수를 사용하여 간단하게 표현 가능
```
chooseToppings()
    .then(toppings => placeOrder(toppings))
    .then(order => collectOrder(order))
    .then(pizza => eatPizza(pizza))
    .catch(failureCallback);
```
- 화살표 함수의 `() => x` 표현은 `() => { return x; }`의 약식 표현
<br>
- 함수는 arguments 를 직접 전달하므로 함수처럼 표현하지 않고 아래와 같이 작성할 수도 있음
```
chooseToppings()
    .then(placeOrder)
    .then(collectOrder)
    .then(eatPizza)
    .catch(failureCallback);
```
- Promise는 한 번에 성공/실패 중 하나의 결과값을 가짐
<br>

### Promise terminology recap
- Promise 가 생성되면 그 상태는 성공도 실패도 아닌 <b>pending</b> 상태
- Primise 결과가 반환되면 결과에 상관 없이 <b>resolved</b> 상태
    - 성공적으로 처리된 Promise 는 <b>fulfilled</b> 상태
      이 상태가 되면 체인의 다음 `.then()` 블럭에서 사용할 수 있는 값을 반환함
      `.then()` 블럭 내부의 executor 함수에 Primise 에서 반환된 값이 파라미터로 전달됨
    - 실패한 Promise는 <b>rejected</b> 상태
      어떤 이유(<b>reason</b>) 때문에 Promise 가 rejected 됐는지를 나타내는 에러메시지를 포함환 결과 반환
      Promise 체이닝의 제일 마지막 `.catch()`에서 상세한 에러 메시지를 확인 가능
<br>

### Running code in response to multiple promises fulfilling
- 모든 Promise 가 fulfilled 일 경우 코드를 실행하는 경우
- `Promise.all()`이라는 static method 를 사용하여 만들 수 있음
- Promise 배열을 매개변수로 삼고, 배열의 모든 Promise 가 fulfilled 일 때만 새로운 fulfilled `Promise` 오브젝트를 반환
```
Promise.all([a, b, c]).then(values => {
    ...
});
```
- 배열의 모든 Promise 가 fulfilled 라면, `.then()` 블럭의 executor 함수로의 매개변수로 Promise 결과의 배열을 전달함
- `Promise.all()`의 Promise 배열 중 하나라도 reject 라면, 전체 결과가 reject
<br>

### Running some final code after a promise fulfills/rejects
- Promise의 결과가 fulfilled 인지 rejected 인지 관계 없이 Promise가 완료된 후 최종 코드 블럭을 실행하려는 경우
<br>
- 이전에는 `.then()` 블럭과 `.catch()` 블럭의 callbacks에 아래와 같이 runFinalCode()를 삽입함
```
myPromise
    .then(response => {
        doSomething(response);
        runFinalCode();
    })
    .catch(e => {
        returnError(e);
        runFinalCode();
    })
```
<br>

- `.finally()` 메서드 사용
```
myPromise
    .then(response => {
        doSomething(response);
    })
    .catch(e => {
        returnError(e);
    })
    .finally(() => {
        runFinalCode();
    });
```
<br>

### Using the Promise() constructor
- `Promise()` constructor 를 사용하여 사용자 정의 Promise 만들 수 있음
- 구식 비동기 API 코드를 Promise 기반 코드로 만들고 싶을 경우에 사용
```
let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('Success!');
    }, 2000);
});
```
- `resolve()`와 `reject()`는 Promise 의 fulfilled / rejected 일 때의 일을 수행하기 위해 호출한 함수

- 이 Promise 를 호출할 때, 끝이 `.then()` 블럭을 사용하면 됨
```
timeoutPromise.then(alert);
```
<br>

- `reject()` method 를 사용하여 Promise 가 rejected 상태일 때 전달할 값을 지정할 수 있음
- Promise가 reject 되면 에러는 `.catch()` 블럭으로 전달됨
```
function timeoutPromise(message, interval) {
    return new Promise((resolve, reject) => {
        if(message === '' || typeof message !== 'string') {
            reject('Message is empty or not a string');
        } else if (interval < 0 || typeof interval !== 'number') {
            reject('Interval is negative or not a number');
        } else {
            settimeout(function() {
                resolve(message);
            }, interval);
        }
    })
}
```
- `timeoutPromise()` 함수는 `Promise`를 반환하므로, `.then()`, `.catch()` 등등을 사용해 Promise 체이닝을 만들 수 있음
```
timeoutPromise("Hello there!", 1000)
    .then(alert)
    .catch(console.log);
```
<br>
### A more real-world example
- [Jake Archibald's idb library](https://github.com/jakearchibald/idb/)
- `Promise()` constructor의 비동기 작업 응용을 보여주는 라이브러리
- 클라이언트 측에서 데이터를 저장하고 검색하기 위한 구식 callback 기반 API 로 Promise 와 함께 사용하는 [IndexedDB API](https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API)
```
function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            reject(request.error);
        }
    })
}
```
- `request`의 success event 가 실행될 때, `onsuccess` 핸들러에 의해 fulfilled 된 Promise 의 request `result`를 반환
- `request`의 error event 가 실행되면, `onerror` 핸들러에 의해 reject 된 Promise 의 request `error`를 반환