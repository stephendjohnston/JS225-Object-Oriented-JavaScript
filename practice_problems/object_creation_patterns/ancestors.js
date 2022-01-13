"use strict";

// Ancestors

/*
Implement an ancestors method that returns the prototype chain (ancestors) 
of a calling object as an array of object names. Here's an example output:
*/

Object.prototype.ancestors = function() {
  let ancestors = [];
  let ancestor = Object.getPrototypeOf(this);

  while (ancestor !== Object.prototype) {
    ancestors.push(ancestor.name);
    ancestor = Object.getPrototypeOf(ancestor);
  }

  return ancestors.concat(['Object.prototype']);
}

// OR LS solution with recursion

Object.prototype.ancestors = function() {
  const ancestor = Object.getPrototypeOf(this);

  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }
  
  return ['Object.prototype'];
}


// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']