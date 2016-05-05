(function(document) {
  'use strict';

  var NB_VARIANTS = 3;

  var variant = Math.floor(NB_VARIANTS * Math.random());

  document.querySelector('#app').questions = [
    {
      i: 1,
      id: 'code1',
      mdFile: './data/exercice.variant.' + variant + '.json.md',
    },
  ];
})(document);

