"use strict";

// Practice Problems: Object Orientation
// In these problems, we will be building an object-oriented inventory 
// management system.

/*
1. Suppose we want to use code to keep track of products in our hardware 
store's inventory. A first stab might look something like this:
*/

let scissorsId = 0;
let scissorsName = 'Scissors';
let scissorsStock = 8;
let scissorsPrice = 10;

let drillId = 1;
let drillName = 'Cordless Drill';
let drillStock = 15;
let drillPrice = 45;

/*
This code presents a number of problems, however. What if we want to add 
another kind of drill? Given what we've learned about object orientation in 
the previous assignment, how could we use objects to organize these two 
groups of data?
*/

let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
}

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,
}

/*
2. Our new organization also makes it easier to write functions dealing with 
the products, because we can now take advantage of conventions in the objects' 
data. Create a function that takes one of our product objects as an argument, 
and sets the object's price to a non-negative number of our choosing, passed 
in as a second argument. If the new price is negative, alert the user that 
the new price is invalid.
*/

function setProductPrice(product, newPrice) {
  if (newPrice >= 0) {
    product.price = newPrice;
  } else {
    alert('Invalid price!');
  }
}

/*
3. It would also be useful to have the ability to output descriptions of our 
product objects. Implement such a function following the example below:
*/

describeProduct(scissors);
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8

function describeProduct(product) {
  console.log('Name: ' + product.name);
  console.log('ID: ' + product.id);
  console.log('Price: ' + product.price);
  console.log('Stock ' + product.stock);
}

/*
4. We want our code to take an object-oriented approach to keeping track of 
the products, and although the functions we just wrote work fine, since they 
are manipulating data in the objects, we should place them in the objects 
themselves. Rewrite the code such that the functions describeProduct and 
setProductPrice become methods describe and setPrice on both our scissors 
and drill objects.
*/

let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,

  describe() {
    console.log('Name: ' + this.name);
    console.log('ID: ' + this.id);
    console.log('Price: ' + this.price);
    console.log('Stock ' + this.stock);
  },

  setPrice(newPrice) {
    if (newPrice >= 0) {
      this.price = newPrice;
    } else {
      alert('Invalid price!');
    }
  }
}

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,

  describe() {
    console.log('Name: ' + this.name);
    console.log('ID: ' + this.id);
    console.log('Price: ' + this.price);
    console.log('Stock ' + this.stock);
  },

  setPrice(newPrice) {
    if (newPrice >= 0) {
      this.price = newPrice;
    } else {
      alert('Invalid price!');
    }
  }
}

/*
5. This solution has brought us closer to our object-oriented ideal, but has 
also introduced some inefficiency, insofar as our setPrice and describe 
methods are duplicated in each object, and we will have to type out this 
code for each new object we want to create. One solution to this problem is 
to stop manually creating each object, and instead use a factory function to 
generate them. Create a new function createProduct which takes arguments 
for id, name, stock, and price and also adds setPrice and describe to the 
new object.
*/

function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

    describe() {
      console.log('Name: ' + this.name);
      console.log('ID: ' + this.id);
      console.log('Price: ' + this.price);
      console.log('Stock ' + this.stock);
    },

    setPrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        alert('Invalid price!');
      }
    }
  }
}

/*
6. Finally, remove the scissors and drill object-literal object creations 
from the code, and recreate these objects using our createProduct factory 
function, along with two or three more products of your choosing.
*/

let scissors = createProduct(0, 'Scissors', 10, 8);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let saw = createProduct(2, 'Circular Saw', 12, 95);
let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
let boxCutter = createProduct(4, 'Box Cutter', 41, 15);
