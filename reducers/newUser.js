export default function(newUser = '', action) {
    if(action.type === "addInfoFirstStep") {
        return action.newUser
    } else {
        return newUser;
    }
}