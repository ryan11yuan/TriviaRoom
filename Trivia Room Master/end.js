const mostRecentScore = sessionStorage.getItem('mostRecentScore');

finalScore.innerText = "Points Gained: " + mostRecentScore;

// Convert mostRecentScore to a number
const numericMostRecentScore = Number(mostRecentScore);

// Retrieve the current cumulative score from localStorage, defaulting to 0 if not found
let cumulativeScore = Number(sessionStorage.getItem('cumulativeScore')) || 0;

cumulativeScore += numericMostRecentScore;

sessionStorage.setItem('cumulativeScore', cumulativeScore);
