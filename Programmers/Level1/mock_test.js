// 모의고사

function solution(answers) {
  let answer = [];
  // const volunteer = [
  //   [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 
  //   [2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5], 
  //   [3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  // ];
  let volunteer = [
    [],
    [],
    []
  ];

  const v1 = [1, 2, 3, 4, 5];
  const v2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const v3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  // for (let m = 0; m < volunteer.length; m++) {
  //   let dup = (answers.length / volunteer[m].length).toFixed();
  //   for (let n = 0; n < dup; n++) {
  //     volunteer[m].push(...volunteer[m]);
  //     // console.log([...volunteer[m]].push[volunteer[m]]);
  //   }
  // }

  const dup1 = (answers.length / v1.length).toFixed();
  const dup2 = (answers.length / v2.length).toFixed();
  const dup3 = (answers.length / v3.length).toFixed();

  const repeat = Math.max(dup1, dup2, dup3);
  // console.log(repeat);

  for (let m = 0; m < repeat; m++) {
    volunteer[0].push(...v1);
    volunteer[1].push(...v2);
    volunteer[2].push(...v3);
  };

  // console.log(volunteer);

  let score = [];

  for (let i = 0; i < volunteer.length; i++) {
    let num = 0;
    for (let j = 0; j < answers.length; j++) {
      if (answers[j] === volunteer[i][j]) num += 1;
    }
    score.push(num);
  }
  // console.log(score);
  for (let k = 0; k < score.length; k++) {
    if (Math.max.apply(null, score) === score[k]) answer.push(k+1);
  }
  // console.log(answer);
  // return answer;
}

console.log(solution([1,2,3,4,5,1,2,3,4,2,5,2,3,1,4,2,1,2,3,1]));
console.log(solution([1,3,2,4,2]));
console.log(solution([1,1,3,4,5,2,3]));