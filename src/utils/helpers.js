export const calculateScore = (answers, correctMarks = 4, negativeMarks = 1) => {
   return answers.reduce((total, answer) => {
     return total + (answer.isCorrect ? correctMarks : -negativeMarks);
   }, 0);
 };
 
 export const formatTime = (seconds) => {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = seconds % 60;
   return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
 };