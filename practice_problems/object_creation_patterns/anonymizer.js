"use strict";

// Anonymizer

const Account = (() => {
  let userFirstName;
  let userLastName;
  let userEmail;
  let userPassword;

  function isValidPassword(password) {
    return password === userPassword;
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * 62)
  }

  function anonymize() {
    const chars = 'abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result = '';

    for (let i = 0; i < 16; i += 1) {
      result += chars[getRandomIndex()];
    }

    return result;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    firstName(testPassword) {
      if (isValidPassword(testPassword)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName(testPassword) {
      if (isValidPassword(testPassword)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(testPassword) {
      if (isValidPassword(testPassword)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },

    reanonymize(testPassword) {
      if (isValidPassword(testPassword)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(testPassword, newPassword) {
      if (isValidPassword(testPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    }
  }
})()

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

// Further Exploration
// This solution works but it only works for one set of private data. 
// Here's an extended version of the example run:

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'

// Modify the solution so that it can accommodate creating multiple 
// objects with their own private data.

const Account = (() => {
  const accounts = {}
  let accountId = 0;

  function incrementId() {
    return accountId += 1;
  }

  function isValidPassword(password, userPassword) {
    return password === userPassword;
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * 62)
  }

  function anonymize() {
    const chars = 'abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result = '';

    for (let i = 0; i < 16; i += 1) {
      result += chars[getRandomIndex()];
    }

    return result;
  }

  return {
    init(email, password, firstName, lastName) {
      this.id = incrementId();
      let account = {
        email,
        password,
        firstName,
        lastName,
      }
      accounts[this.id] = account;
      this.displayName = anonymize();
      return this;
    },

    firstName(testPassword) {
      if (isValidPassword(testPassword, accounts[this.id].password)) {
        return accounts[this.id].firstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName(testPassword) {
      if (isValidPassword(testPassword, accounts[this.id].password)) {
        return accounts[this.id].lastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(testPassword) {
      if (isValidPassword(testPassword, accounts[this.id].password)) {
        return accounts[this.id].email;
      } else {
        return 'Invalid Password';
      }
    },

    reanonymize(testPassword) {
      if (isValidPassword(testPassword, accounts[this.id].password)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(testPassword, newPassword) {
      if (isValidPassword(testPassword, accounts[this.id].password)) {
        accounts[this.id].password = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    }
  }
})();