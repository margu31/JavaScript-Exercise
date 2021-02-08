const express = require('express');
const cors = require('cors');
// import express from 'express'; 
// npm으로 설치한 것은 모두 node_modules에 들어가있으므로 패키지 이름만 써주면 됨
// 직접 만든 모듈은 경로를 적어줘야함
// import moduleName from 'cors';
// import cors from 'cors';

const isEmptyObject = require('./utils/isEmptyObject.js');
const isDuplicatedId = require('./utils/isDuplicatedId.js');

// import isEmptyObject from './utils/isEmptyObject.js';
// import isDuplicatedId from './utils/isDuplicatedId.js';

// import todos from './data/todos.js';
// import 하면 let으로 선언한 변수도 const가 되어버림 따라서 readonly일 경우에만 쪼개라(상수로 관리하겠다면)
// esm은 안됨 커먼 뭐시기는 가능

let todos = [
  { id: 3, content: 'Javascript', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: true },
];

const app = express();

app.use(cors());
app.use(express.static('public')); // 루트 디렉토리로 삼겠다 
app.use(express.json());

// 전체 데이터 취득
app.get('/todos', (req, res) => {
  res.send(todos);
});

// 해당 아이디 데이터만 취득
app.get('/todos/:id', (req, res) => { // id 앞의 :는 변수로? , parameter다
  // console.log(req.params);
  res.send(todos.filter(todo => todo.id === +req.params.id)); // send 함수가 알아서 stringify 해줌

  // if (!todos.find(todos => todos.id === +req.params.id)) {
  //   res.send({
  //     error: true,
  //     reason: '존재하지 않는 id입니다. 다시 한번 확인 부탁드립니다.'
  //   })
  // } else {
  //   res.send(todos.filter(todo => todo.id === +req.params.id)); 
  // }
});

// 새로운 데이터 생성
app.post('/todos', (req, res) => {
  // 페이로드가 없는 경우 빈 객체가 들어가버림 -> 걸러줘야한다
  // id가 중복된 경우 걸러줘야함 -> 원래 db에서 처리해줌(서버에서)

  // console.log(req.body);
  // 엄엄엄엄.. 정보 받아서 받은 id를 가지고 map돌리면서 기존 todo의 id랑 중복되는게 있는지 확인
  // 있으면 에러, 없으면 아래 코드 실행
  // 음.. map이 아니면.. 음

  // if (todos.find(todo => todo.id === req.body.id)) {
  //   res.send({
  //     error: true,
  //     reason: '동일한 id가 이미 존재합니다.'
  //   })
  // } else {
  //   todos = [req.body, ... todos];
  //   res.send(todos);
  // }

  // 강사님 코드
  const newTodo = req.body; // 페이로드가 없는 경우 {}가 옴
  // 페이로드가 없는 경우
  if (isEmptyObject(newTodo)) {
    return res.status(400).send({
      error: true,
      reason: '페이로드가 존재하지 않습니다.'
    });
  }
  // 아이디가 중복된 경우
  if (isDuplicatedId(todos, newTodo.id)) {
    return res.status(400).send({
      error: true,
      reason: '아이디 ${newTodo.id}이 중복되었습니다.'
    });
  }

  todos = [req.body, ... todos];
  res.send(todos);
});

// 해당 id 데이터의 내용 수정
app.patch('/todos/:id', (req, res) => { 
  // id 안들어오면 밑에 일괄 변경 코드로 처리됨
  const id = +req.params.id;
  const completed = req.body;

  todos = todos.map(todo => (todo.id === id ? { ...todo, ...completed } : todo));
  res.send(todos);

  // if (!todos.find(todos => todos.id === id)) {
  //   res.send({
  //     error: true,
  //     reason: '존재하지 않는 id이므로 다시 한번 확인 부탁드립니다.'
  //   })
  // } else {
  //   todos = todos.map(todo => (todo.id === id ? { ...todo, ...completed } : todo))
  //   res.send(todos); // 실패했을 경우라도 send를 꼭 해줘야함
  // }
});

// 전체 데이터 일괄 변경 
app.patch('/todos', (req, res) => {
  // 페이로드가 안들어오면 무시함
  const completed = req.body;

  todos = todos.map(todo => ( { ...todo, ...completed } ))
  res.send(todos); // 실패했을 경우라도 send를 꼭 해줘야함
});

// 전체 데이터 삭제
app.delete('/todos/completed', (req, res) => {
  todos = todos.filter(todo => !todo.completed);
  res.send(todos); // 실패했을 경우라도 send를 꼭 해줘야함
});

// 해당 id 데이터 삭제
app.delete('/todos/:id', (req, res) => {
  const id = +req.params.id;

  todos = todos.filter(todo => todo.id !== id);
  res.send(todos);

  // if (!todos.find(todo => todo.id === id)) {
  //   res.send({
  //     error: true,
  //     reason: '존재하지 않는 id입니다. 확인 후 재시도 부탁드립니다.'
  //   })
  // } else {
  //   todos = todos.filter(todo => todo.id !== id);
  //   res.send(todos); // 실패했을 경우라도 send를 꼭 해줘야함
  // }
});

app.listen('7000', () => {
  console.log('Server is listening on http:/localhost:7000');
}); 
 

// 강사님 의견 : post 에서만 처리해주면 될 듯하다.. fake server니까 너무 꼼꼼히 할 필요 없음

// endpoint????
// 라우트?
// 클라이언트 잘못 400번대, bad request 포괄적 = 400
// 서버 잘못 500번대
