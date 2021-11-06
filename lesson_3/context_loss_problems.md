##### JS225 > Function Contexts and Objects

---

# Practice Problems: Dealing with Context Loss

1. Our desired output for the code below is: `Christopher Turk is a Surgeon.` What will the code output, and what explains the difference, if any, between the actual and desired outputs?

   ```javascript
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription() {
       return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
     }
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription);
   ```

   - ##### Solution

     ```none
     undefined undefined is a undefined.
     ```

     When we extracted `getDescription` from `turk` and passed it into `logReturnVal` as an argument, we removed the method from its context. As a result, upon execution as `func`, `this` will point to the global object, rather than `turk`. Since `Window` doesn't have properties defined for `firstName`, `lastName`, or `occupation`, we get the output we do.

2. Alter `logReturnVal` such that it takes an additional `context` argument, and use one of the methods we've learned in this lesson to invoke `func` inside of `logReturnVal` with `context` as its function execution context. Alter the invocation of `logReturnVal` and supply `turk` as the context argument.

   - ##### Solution

     ```javascript
     function logReturnVal(func, context) {
       let returnVal = func.call(context);
       console.log(returnVal);
     }
     
     logReturnVal(turk.getDescription, turk);
     ```

     Using `call` to invoke `func` and passing in the argument `context`, we are able to supply the function with execution context. On the invocation on the last line of our code we do just this, supplying `turk` as the context and producing our desired output.

     Note that, in this case, the use of `apply` is equally suitable as a solution.

3. Suppose that we want to extract `getDescription` from `turk`, but always have it execute with `turk` as context. Use one of the methods we've learned in the last lesson to assign such a permanently bound function to a new variable, `getTurkDescription`.

   - ##### Solution

     ```javascript
     let getTurkDescription = turk.getDescription.bind(turk);
     ```

4. Consider the code below, and our desired output:

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ' ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Desired output:

   ```none
   The Elder Scrolls Arena
   The Elder Scrolls Daggerfall
   The Elder Scrolls Morrowind
   The Elder Scrolls Oblivion
   The Elder Scrolls Skyrim
   ```

   Will this code log our desired output? Why or why not?

   - ##### Solution

     This code doesn't log our desired output, but instead logs this:

     ```none
     undefined Arena
     undefined Daggerfall
     undefined Morrowind
     undefined Oblivion
     undefined Skyrim
     ```

     This happens because functions as arguments lose the surrounding context. In this case, the function expression invoked on each iteration of `forEach` inside of `listGames` loses `TESgames` as context. As a result, `this` on line 6 references the global object, and resolves to `undefined` rather than `"The Elder Scrolls"`.

5. Use an arrow function so that the code logs our desired output.

   - ##### Solution

     ```javascript
     let TESgames = {
       titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
       seriesTitle: 'The Elder Scrolls',
       listGames() {
         this.titles.forEach((title) => {
           console.log(this.seriesTitle + ' ' + title);
         });
       }
     };
     ```

6. Use the `let self = this` fix to alter `TESgames.listGames` such that it logs our desired output to the console.

   - ##### Solution

     ```javascript
     let TESgames = {
       titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
       seriesTitle: 'The Elder Scrolls',
       listGames() {
         let self = this;
         this.titles.forEach(function(title) {
           console.log(self.seriesTitle + ' ' + title);
         });
       }
     };
     ```

7. If we don't want to rely on `let self = this`, `forEach` provides us with an alternative means of supplying execution context to the inner function. Use this means to achieve our desired output.

   - ##### Solution

     ```javascript
     let TESgames = {
       titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
       seriesTitle: 'The Elder Scrolls',
       listGames() {
         this.titles.forEach(function(title) {
           console.log(this.seriesTitle + ' ' + title);
         }, this);
       }
     };
     ```

     `forEach` (and many other list-processing methods) have an optional `thisArg` parameter that, if supplied an argument, sets that argument as execution context for the inner function. In the solution above, we pass `this` as the context argument, ensuring that the value of `this` in the inner function refers to `TESgames`.

8. Consider the code below:

   ```javascript
   let foo = {
     a: 0,
     incrementA() {
       function increment() {
         this.a += 1;
       }
   
       increment();
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   What will the value of `foo.a` be after this code has executed?

   - ##### Solution

     ```javascript
     foo.a // 0
     ```

     Since inner functions lose the outer object as context, `this.a` on line 5 references a global `a`, rather than `foo`'s property `a`. As a result, `foo.a` is unaltered by the method invocations, and its value remains `0`.

9. Use one of the methods we learned in this lesson to invoke `increment` with explicit context such that `foo.a` is incremented with each invocation of `incrementA`.

   - ##### Solution

     ```javascript
     let foo = {
       a: 0,
       incrementA() {
         function increment() {
           this.a += 1;
         }
     
         increment.apply(this);
       }
     };
     ```

     We can use `apply` (or, for that matter, `call`) to invoke `increment` on line 8 with explicit context. We pass in `this` as the context argument, since inside of method space (but outside of inner function space) `this` references the containing object.

10. We decide that we want each invocation of `foo.incrementA` to increment `foo.a` by `3`, rather than `1`, and alter our code accordingly:

    ```javascript
    let foo = {
      a: 0,
      incrementA() {
        function increment() {
          this.a += 1;
        }
    
        increment.apply(this);
        increment.apply(this);
        increment.apply(this);
      }
    };
    ```

    Calling `apply` three times seems repetitive, though. Use `bind` to permanently set `foo` as `increment`'s execution context.

    - ##### Solution

      ```javascript
      let foo = {
        a: 0,
        incrementA() {
          let increment = function() {
            this.a += 1;
          }.bind(this);
      
          increment();
          increment();
          increment();
        }
      }
      ```

      We get to use `Function.prototype.bind` by changing the syntax for defining the `increment` function from a function declaration to a function expression. We then supply `this` as context, because `this` points to the object holding the method.