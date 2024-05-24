const crypto = require('crypto');
const randomUserName = (length = 6) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let username = '';
    for(let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * characters.length);
      username += characters[idx];
    }
    return username;
  }
  const randomPassword = (length = 6) => {
    const numbers = '0123456789'
    let password = '';
    for(let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * numbers.length);
      password += numbers[idx];
    }
    return password;
  
  }
  const generateUniqueUserNames = (count) => {
    const usernames = new Set();
    while(usernames.size < count){
      let username = randomUserName();
      usernames.add(username);
    }
    return Array.from(usernames);
  }
  const generateUniquePasswords = (count) => {
    const passwords = new Set();
    while(passwords.size < count){
      let password = randomPassword();
      passwords.add(crypto.createHash("sha256").update(password).digest('hex').toString());
    }
    return Array.from(passwords);
  }
  module.exports = {
    generateUniqueUserNames,
    generateUniquePasswords
  }