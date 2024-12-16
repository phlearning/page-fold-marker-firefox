let foldMarkers = [];

function createFoldMarker(position, orientation) {
  const marker = document.createElement('div');
  marker.className = `fold-marker ${orientation}`;
  
  if (orientation === 'horizontal') {
    marker.style.top = `${position}%`;
  } else {
    marker.style.left = `${position}%`;
  }
  
  return marker;
}

function clearFolds() {
  foldMarkers.forEach(marker => marker.remove());
  foldMarkers = [];
}

function setFolds(numFolds, orientation = 'horizontal') {
  clearFolds();
  
  if (numFolds === 0) return;

  const container = document.createElement('div');
  container.className = 'fold-container';
  document.body.appendChild(container);

  // Calculate positions for fold lines
  const spacing = 100 / (numFolds + 1);
  for (let i = 1; i <= numFolds; i++) {
    const marker = createFoldMarker(spacing * i, orientation);
    container.appendChild(marker);
    foldMarkers.push(marker);
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.command === 'setFolds') {
    setFolds(message.folds, message.orientation);
  }
});