var randomPassword = {
    getRandomPassword: function getPassword() {
    var text = ""; //random text
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let password = text;
    return password;
}
}
module.exports = randomPassword;