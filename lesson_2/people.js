"use strict";

let me = {};

me.firstName = 'Stephen';
me.lastName = 'Johnston';

let friend = {
  firstName: 'Matt',
  lastName: 'Johnston'
}

let mother = {
  firstName: 'Carol',
  lastName: 'Johnston'
}

let father = {
  firstName: 'Brian',
  lastName: 'Johnston'
}

let people = {
  collection: [me, friend, mother, father],
  count: 0,
  
  fullName(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },
  
  rollCall() {
    this.collection.forEach(this.fullName)
  },
  
  add(person) {
    if (this.isInvalidPerson(person)) return;
    
    this.count += 1;
    person['index'] = this.count;
    this.collection.push(person)
  },
  
  getIndex(person) {
    let index = -1;
    this.collection.forEach((comparator, i) => {
      if (comparator.firstName === person.firstName && comparator.lastName === person.lastName) {
        index = i;
      }
    });
    
    return index;
  },
  
  remove(person) {
    let index;
    
    if (this.isInvalidPerson(person)) {
      return;
    }
    
    index = this.getIndex(person);
    if (index === -1) return;
    
    this.collection.splice(index, 1);
  },
  
  isInvalidPerson(person) {
    return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
  },
  
  get(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }
    
    return this.collection[this.getIndex(person)];
  },
  
  update(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }
    
    let existingPersonId = this.getIndex(person);
    if (existingPersonId === -1) {
      this.add(person);
    } else {
      this.collection[existingPersonId] = person;
    }
  }
}

let buddy = {
  firstName: 'Joe',
  lastName: 'Blow'
}

people.add(buddy)
console.log(people.get(mother))
people.add({firstName: 'John', lastName: 'Doe'})
people.add({firstName: 'Jane', lastName: 'Doe'})
people.remove({firstName: 'John', lastName: 'Doe'})
people.add({firstName: 'Jimothy', lastName: 'James'})
console.log(people.collection)
