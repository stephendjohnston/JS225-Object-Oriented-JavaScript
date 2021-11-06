##### JS225 > Function Contexts and Objects

---

# Practice Problems: What is this? (2)

While working through these practice problems, assume that the code runs within a web page.

1. What does `this` point to in the code below, and what does the method return?

   ```javascript
   let myObject = {
     count: 1,
     myChildObject: {
       myMethod() {
         return this.count;
       },
     },
   };
   
   myObject.myChildObject.myMethod();
   ```

   - ##### Solution

     `this` is `myChildObject`, which means `this.count` is `undefined`, so the return value is `undefined`.

2. In the previous problem, how would you change the context, or the value of `this`, to be the parent `myObject`?

   - ##### Solution

     We can use the `call` or `apply` method; all you have to do is pass in the appropriate context object:

     ```javascript
     myObject.myChildObject.myMethod.call(myObject);
     ```

3. What does the following code log to the console?

   ```javascript
   let person = {
     firstName: 'Peter',
     lastName: 'Parker',
     fullName() {
       console.log(this.firstName + ' ' + this.lastName +
                   ' is the Amazing Spiderman!');
     },
   };
   
   let whoIsSpiderman = person.fullName.bind(person);
   whoIsSpiderman();
   ```

   - ##### Solution

     ```plaintext
     Peter Parker is the Amazing Spiderman!
     ```

     The `bind` method returns a new function that permanently binds `this` in the function assigned to `fullName` to the `person` object itself.

4. What does the following code log to the console?

   ```javascript
   let computer = {
     price: 30000,
     shipping: 2000,
     total() {
       let tax = 3000;
       function specialDiscount() {
         if (this.price > 20000) {
           return 1000;
         } else {
           return 0;
         }
       }
   
       return this.price + this.shipping + tax - specialDiscount();
     }
   };
   
   console.log(computer.total());
   ```

   If you want this program to log `34000`, how would you fix it?

   - ##### Solution

     As written, this code logs `35000` to the console. This is because `specialDiscount`'s `this` is the global object since we call `specialDiscount` as a function, which gives it implicit context. Thus, `specialDiscount` returns `0`. [Recall](https://launchschool.com/lessons/2555bbbb/assignments/28112e58) that nested functions lose the outer method's context.

     One way to fix this code is to save `this` in the function's lexical scope and use that saved value in place of `this`:

     ```javascript
     let computer = {
       price: 30000,
       shipping: 2000,
       total() {
         let tax = 3000;
         let self = this;
         function specialDiscount() {
           if (self.price > 20000) {
             return 1000;
           } else {
             return 0;
           }
         }
     
         return this.price + this.shipping + tax - specialDiscount();
       }
     };
     
     console.log(computer.total());
     ```

     Another way is to bind `this` from `total` to the `specialDiscount` function, which makes `this` inside `specialDiscount` the same as `this` in `total`.

     ```javascript
     let computer = {
       price: 30000,
       shipping: 2000,
       total() {
         let tax = 3000;
         let specialDiscount = function () {
           if (this.price > 20000) {
             return 1000;
           } else {
             return 0;
           }
         }.bind(this);
     
         return this.price + this.shipping + tax - specialDiscount();
       }
     };
     
     console.log(computer.total());
     ```

     The final way to fix this code is to use `call` or `apply` with an argument of `this` to invoke `specialDiscount`:

     ```javascript
     let computer = {
       price: 30000,
       shipping: 2000,
       total() {
         let tax = 3000;
         function specialDiscount() {
           if (this.price > 20000) {
             return 1000;
           } else {
             return 0;
           }
         };
     
         return this.price + this.shipping + tax - specialDiscount.apply(this);
       }
     };
     
     console.log(computer.total());
     ```