export default function(newUser = "", action) {
    if(action.type == "newUser") {
        return action.newUser;
    } else {
        return newUser;
    }
}