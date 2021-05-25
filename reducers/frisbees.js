export default function(frisbee = {}, action) {
    if (action.type == 'getFrisbeeData' ) {
/*         console.log('frisbee dans le reducer', action.frisbee) */
        return action.frisbee
    } else {
        return frisbee;
    }
}