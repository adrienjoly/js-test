const wunderbar = require('@gribnoysup/wunderbar');

const gradeStep = 3;
const gradeLines = [0, 3, 6, 9, 12, 15, 18];
const gradePadding = Math.max.apply(null, gradeLines).toString().length;
const rangePadding = gradePadding * 2 + 1 + 1; // number of characters to display range

// generate grade/score distribution chart
function renderDistributionChart({ flatScores }) {
  const nbStudentsPerGrade = gradeLines.map(function(grade) {
    return flatScores.reduce(function(count, studentScore) {
      return count + (studentScore >= grade && studentScore < grade + gradeStep ? 1 : 0);
    }, 0);
  });
  const { chart, scale } = wunderbar(nbStudentsPerGrade, {
    min: 0,
    max: flatScores.length, // number of students
    length: 42,
  });
  return []
    .concat(chart.split('\n').map(function(line, i) {
      var low = Math.floor(i * gradeStep).toString().padStart(gradePadding, '0');
      var high = Math.floor((i + 1) * gradeStep - 1).toString().padStart(gradePadding, '0');
      var range = [low, high].join('-');
      return range.padEnd(rangePadding, ' ') + line
        + ' (' + nbStudentsPerGrade[i] + ' stud.)';
    }))
    .concat([ ''.padStart(rangePadding, ' ') + scale ])
    .join('\n');
}

const renderFromScoreFileStream = ({stream = process.stdin, skipHeader = true} = {}, cb) => {
  const reader = require('readline').createInterface({
    input: stream
  });
  const studentScores = [];
  reader.on('line', line => {
    if (skipHeader) {
      skipHeader = false;
      // this will skip the first line (header)
    } else {
      studentScores.push(line.split(',')[1]);
    }
  });
  reader.on('close', () => cb(renderDistributionChart({ flatScores: studentScores })));
};


module.exports = renderDistributionChart;

module.exports.renderFromScoreFileStream = renderFromScoreFileStream;
