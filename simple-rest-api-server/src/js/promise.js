const ajax = (() => {
  const req = (method, url, payload) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open(method, url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(payload));
  
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.status));
        }
      }
    })
  };

  // req함수가 promise객체를 반환함

  return {
    get(url) { // get도 프로미스 객체로 프로미스를 반환해줘야하므로 return 명시
      return req('GET', url);
    },
    post(url, payload) {
      return req('POST', url, payload);
    },
    patch(url, payload) {
      return req('PATCH', url, payload);
    },
    delete(url) {
      return req('DELETE', url);
    }
  };
})();

export default ajax;