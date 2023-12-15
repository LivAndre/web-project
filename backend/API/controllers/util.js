const checkAddress = (str) =>
{
    var re = /city/i;
    return re.test(str)
}
const checkEmail = (str) =>
{
    var re = /^[a-zA-Z0-9_.-]+@[^\s@]+\.[^\s@]+$/
    return re.test(str)
}
const checkCharacters = (str) =>
{
    var re = /[a-zA-Z]/
    return re.test(str)
}
const checkNumbers = (str) =>
{
    var re = /[0-9]/
    return re.test(str)
}

const checkSpecialChar = (str) =>
{
    var re = /[!@#$%^&*(),.?":{}|<>]/
    return re.test(str)
}
module.exports = {
    checkAddress,
    checkEmail,
    checkCharacters,
    checkSpecialChar,
    checkNumbers
  
}