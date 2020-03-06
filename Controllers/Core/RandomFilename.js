var randomFilename = {
    getFileName: function getImageNameWithRandomFilename(fileName) {
    var text = ""; //random text
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let d = Date.now();
    let imageName = text + d + fileName;
    return imageName;
}
}
module.exports = randomFilename;