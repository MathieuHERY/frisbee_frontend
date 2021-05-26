export default function(resultAnswer = false, action) {
    if (action.type == 'SubmitAnswerFrisbee' ) {
        console.log('Dans le réduceur', action.resultAnswer)
        return action.resultAnswer;
    } else {
        return resultAnswer;
    }
}