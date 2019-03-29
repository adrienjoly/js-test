// Extract student scores from eval.log to scores.csv

const readline = require('readline');
const computeStats = require('./computeStats');

const studentScores = []; // for each student: total score followed by number of points for each question

var SCORE_DECIMAL_DIGITS = 2;

// note: returns a string
const renderScore = (score) => parseFloat(score).toFixed(SCORE_DECIMAL_DIGITS);

class StudentEvalParser {
  constructor(name) {
    this.name = name;
    this.totalScore;
    this.scores = [];
  }
  feedLine(line) {
    // "  | qcm5 : 4 (solution: 3) => 0 pts"
    const [ , pts ] = line.match(/^  \| qcm\d+ : \d+ \(solution: \d+\) => (\d+(\.\d+)?) pts/) || [];
    if (pts) {
      this.scores.push(parseFloat(pts));
      return;
    }

    /*
    // "  | // -> STUDENT SCORE ARRAY: [ 1, 1, 1, 0, 0 ]"
    const [ , array ] = line.match(/^  \| \/\/ -> STUDENT SCORE ARRAY: (.+)/) || [];
    if (array) {
      console.log(JSON.parse(array));
      // this.scores.push(...JSON.parse(array));
      return;
    }
    */

    // "  | // -> EXERCISE POINTS: 2.25 / 3.75"
    const [ , codePts ] = line.match(/^  \| \/\/ -> EXERCISE POINTS: (\d+(\.\d+)?)/) || [];
    if (codePts) {
      this.scores.push(parseFloat(codePts));
      return;
    }

    // "=> TOTAL STUDENT SCORE: 8.88 / 20"
    const [ , totalScore ] = line.match(/^=> TOTAL STUDENT SCORE: (\S+) /) || [];
    if (totalScore) {
      this.totalScore = parseFloat(totalScore);
      return;
    }
  }
  flush() {
    const scores = [ this.totalScore ].concat(this.scores);
    studentScores.push(scores);
    console.log([ this.name ].concat(scores.map(renderScore)).join(','));
  }
}

let currentParser;

const stream = process.stdin; //require('fs').createReadStream('eval.log', "utf8");
const reader = readline.createInterface({
  input: stream
});

reader.on('line', line => {
  // look for line: "STUDENT: xxx_yyy"
  const [ match, studentName ] = line.match(/^STUDENT: (\S+)/) || [];
  if (studentName) {
    if (currentParser) currentParser.flush();
    currentParser = new StudentEvalParser(studentName);
  } else if (currentParser) {
    currentParser.feedLine(line);
  } else {
    // console.error('no student set for line:', line);
  }
});

reader.on('close', () => {
  if (currentParser) currentParser.flush();
  const { min, average, median, max } = computeStats(studentScores);
  const lines = [
    [ '(MIN)' ].concat(min.map(renderScore)),
    [ '(AVERAGE)' ].concat(average.map(renderScore)),
    [ '(MEDIAN)' ].concat(median.map(renderScore)),
    [ '(MAX)' ].concat(max.map(renderScore)),
  ];
  console.log(lines.map(line => line.join(',')).join('\n'));
  process.exit();
});
