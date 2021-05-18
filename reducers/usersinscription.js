export default function(Firstname = "", action) {
    if(action.type == "saveFirstname") {
        return action.Firstname;
    } else {
        return Firstname;
    }
}