const promiseGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resoleve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};


promiseGet('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log('Bye!'));

const url = 'https://jsonplaceholder.typicode.com';

promiseGet(`${url}/posts/1`)
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then(userInfo => console.log(userInfo))
  .catch(err => console.error(err));
  

