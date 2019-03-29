function sum(a, b) {
  return a + b;
}

function median(arr){
  arr = arr.sort(function(a, b){ return a - b; });
  var i = arr.length / 2;
  return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}

const computeStats = (studentScores) => {
  // for each student: total score followed by number of points for each question
  // rotate this score matrix to get scores per student per question, cf https://stackoverflow.com/a/17428705/592254
  var scoresPerQ = studentScores[0].map((col, i) => studentScores.map(row => row[i]));
  // compute statistics
  return {
    min: scoresPerQ.map(scores => Math.min.apply(null, scores)),
    average: scoresPerQ.map(scores => scores.reduce(sum) / scores.length),
    median: scoresPerQ.map(scores => median(scores)),
    max: scoresPerQ.map(scores => Math.max.apply(null, scores)),
  };
};

module.exports = computeStats;
