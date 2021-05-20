export default function(newUser = [], action) {
    if (action.type == 'addNewUser' ) {
        var newUserCopy = [...newUser];

        var findUser = false;

        for (let i = 0 ; i < newUserCopy.length ; i++) {
            if (newUserCopy[i].FirstName == true ) {
                findUser = true
            }

        }
        return action.userId;
    } else {
        return userId;
    }
}