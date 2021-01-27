// const get = url => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('GET', url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 201 || xhr.status === 200) { 
//       console.log(JSON.parse(xhr.response)); 
//     } else { 
//       console.error(xhr.status);
//     }
//   };
// };

// const post = (url, payload) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('POST', url);
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(payload));

//   xhr.onload = () => {
//     if (xhr.status === 201 || xhr.status === 200) { 
//       console.log(JSON.parse(xhr.response)); 
//     } else { 
//       console.error(xhr.status);
//     }
//   };
// };

// const patch = (url, payload) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('PATCH', url);
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(payload));

//   xhr.onload = () => {
//     if (xhr.status === 201 || xhr.status === 200) { 
//       console.log(JSON.parse(xhr.response)); 
//     } else { 
//       console.error(xhr.status);
//     }
//   };
// };

// const remove = url => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('DELETE', url);
//   // xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 201 || xhr.status === 200) { 
//       console.log(JSON.parse(xhr.response)); 
//     } else { 
//       console.error(xhr.status);
//     }
//   };
// };



// const xhr = new XMLHttpRequest();

// xhr.open('POST', '/todos'); // 서버와의 통신을 준비 - 인수는 (method, uri-리소스), 실제 요청안됨
// xhr.setRequestHeader('content-type', 'application/json');
// xhr.send(JSON.stringify({id: 4, content: 'React', completed: false})); // 요청을 보냄

// xhr.open('PATCH', '/todos/4'); // 바꿀 데이터의 id 
// xhr.setRequestHeader('content-type', 'application/json');
// xhr.send(JSON.stringify({completed: true})); // 변경할 데이터만 보냄

// xhr.open('DELETE', '/todos/4'); // 지우는건 id만 알면 됨
// xhr.send(); // 페이로드가 없어도 된다.


// 비동기 식으로 요청이 오기 때문에 이벤트를 ?

// 받는 처리
// xhr.onreadystatechange = () => {
//   if (xhr.readyState !== XMLHttpRequest.DONE) return;

//   if (xhr.status === 200) {
//     console.log(JSON.parse(xhr.response)); // xhr.response의 타입은 string (서버는 json형식의 문자열을 줌)
//   } else { // 현업에서 이 부분을 잘 처리해줘야함..
//     console.error(xhr.status);
//   }
// };

// http status 값
// 200 번대 전부 성공
// 400번대-요청 잘못했을때(404 not found), 500번대-서버에서 문제가 생겼을때 에러

// onload 반드시 데이터가 

// xhr.onload = () => {
//   // 에러 메세지가 도착하더라도 성공적으로 요청이 완료됐다고 함 따라서 밑에 코드 처리를 꼭 해줘야햄
//   // onerror는 요청조차 못보낸것
//   if (xhr.status === 201 || xhr.status === 200) { // post 일때만 201, 그 외 성공은 200
//     console.log(JSON.parse(xhr.response)); // xhr.response의 타입은 string (서버는 json형식의 문자열을 줌)
//   } else { // 현업에서 이 부분을 잘 처리해줘야함..
//     console.error(xhr.status);
//   }
// };

// get('/todos');
// post('/todos', {id: 4, content: 'React', completed: false});
// patch('/todos/4', {completed: true});
// remove('/todos/4');



// const ajax = (function () {
//   function request (method, url, payload) {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.send(JSON.stringify(payload));
//     xhr.onload = () => {
//       if (xhr.status === 200 || xhr.status === 201) {
//         console.log(JSON.parse(xhr.response));
//       } else {
//         console.error(xhr.status);
//       }
//     };
//   };
//   return {
//     get(url) {
//       request('GET', url);
//     },
//     post(url, payload) {
//       request('POST', url, payload);
//     },
//     patch(url, payload) {
//       request('PATCH', url, payload);
//     },
//     delete(url) {
//       request('DELETE', url);
//     }
//   }
// })();

// ajax.get('/todos');
// ajax.post('/todos', {id: 4, content: 'React', completed: false});
// ajax.patch('/todos/4', {completed: true});
// ajax.delete('/todos/4');


// 강사님 코드

// 정보은닉 - 클로저로 캡슐화 
const ajax = (() => {
  // payload는 옵션이니 맨 뒤로 보내줌
  const req = (method, url, successCallback, failureCallback, payload) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        successCallback(JSON.parse(xhr.response));
      } else {
        failureCallback(xhr.status);
      }
    };
  };

  return {
    get(url, successCallback, failureCallback) {
      req('GET', url, successCallback, failureCallback);
    },
    post(url, payload, successCallback, failureCallback) {
      req('POST', url, successCallback, failureCallback, payload);
    },
    patch(url, payload, successCallback, failureCallback) {
      req('PATCH', url, successCallback, failureCallback, payload);
    },
    delete(url, successCallback, failureCallback) {
      req('DELETE', url, successCallback, failureCallback);
    },
})();
 
// ajax.get('/todos', console.log, console.error);
ajax.post('/todos', {id: 4, content: 'React', completed: false}, console.log, console.error);