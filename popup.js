document.addEventListener('DOMContentLoaded', function() {
  const applyButton = document.getElementById('applyFolds');
  const clearButton = document.getElementById('clearFolds');
  const foldCountInput = document.getElementById('foldCount');
  const orientationSelect = document.getElementById('orientation');

  applyButton.addEventListener('click', function() {
    const folds = parseInt(foldCountInput.value) || 0;
    const orientation = orientationSelect.value;
    
    if (folds < 1 || folds > 10) {
      alert('Please enter a number between 1 and 10');
      return;
    }

    browser.tabs.query({active: true, currentWindow: true})
      .then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: 'setFolds',
          folds: folds,
          orientation: orientation
        });
      });
  });

  clearButton.addEventListener('click', function() {
    browser.tabs.query({active: true, currentWindow: true})
      .then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: 'setFolds',
          folds: 0
        });
      });
  });
});