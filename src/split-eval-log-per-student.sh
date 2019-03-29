#!/bin/bash

# Splits a given eval.log file to 1 file per student (./Eval_<student_name>.txt).

perl -pwe '
  if (/^STUDENT: (\S+)/) {
    open $out, ">", "Eval_$1.txt" or die $!;
    select $out;
  }' $1
