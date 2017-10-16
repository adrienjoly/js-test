# commands used to clean exercises and student data from repo:

bfg --delete-files *.log
bfg --delete-files *.pdf
bfg --delete-files ex.*.md
bfg --delete-files ex.*.js
bfg --delete-files "exercice*.md"
bfg --delete-files "exercice*.json"
bfg --delete-folders exam-data
bfg --delete-folders student-groups
bfg --delete-files "*class*.csv"
bfg --delete-files "*class*.json"
bfg --delete-files "*class*.txt"
bfg --delete-files "*note*.csv"
bfg --delete-files "classe*.*"
bfg --delete-folders "solutions"
bfg --delete-files "solution*.*"
bfg --delete-folders "student-answers"
bfg --delete-files "fraud.txt"
bfg --delete-files "score*.txt"
bfg --delete-files "score*.csv"
cd public && bfg --delete-folders data ../ && cd .. 
cd public/scripts && bfg --delete-files exam-data.js ../../ && cd ../.. 

# https://github.com/rtyley/bfg-repo-cleaner/issues/187#issuecomment-262145467
