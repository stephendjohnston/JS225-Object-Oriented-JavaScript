##### JS225 > Function Contexts and Objects

---

# Practice Problems: The Global Object

Be sure to use Chrome Snippets for this assignment. You can use other browser tools or Node, but we will assume that you're using Chrome.

1. With strict mode not enabled, what object serves as the implicit execution context? What happens when strict mode is enabled?

   ##### Solution:

   ```markdown
   window
   ```

   In strict mode, the global object is not accessible as the implicit execution context.

2. What does the code below log?

   ```javascript
   a = 10;
   
   console.log(window.a === a);
   ```

   ##### Solution:

   ```markdown
   true
   ```

   Initializing an undeclared variable, as we do on line 1 in the code above, automatically creates that variable as a property on `window` since the global object is the implicit context for evaluating expressions.

3. What does the code below log?

   ```javascript
   "use strict"
   
   a = 10;
   
   console.log(window.a === a);
   ```

   ##### Solution:

   Nothing is logged as line 1 raises a `ReferenceError`. (Line 1 being a = 10)

   In strict mode, using variables that have not been previously declared is not allowed. Since `a` was not previously declared, the assignment on line 1 raises an error.

4. What does the code below do?

   ```javascript
   function func() {
     let b = 1;
   }
   
   func();
   
   console.log(b);
   ```

   ##### Solution:

   It raises an error:

   ```plaintext
   Uncaught ReferenceError: b is not defined
   ```

   This code throws a `ReferenceError`, because the variable *declaration* on line 2 (which is executed when `func` is invoked on line 5) occurs in function scope. Thus, it isn't a property on the global object and isn't accessible outside the function.

5. What does the code below do?

   ```javascript
   function func() {
     b = 1;
   }
   
   func();
   
   console.log(b);
   ```

   ##### Solution:

   ```plaintext
   1
   ```

   Unlike in the previous problem, we don't *declare* `b`; rather, we simply initialize it. As a result, `b` is created as a property on the global object, despite the fact that it's initialized in function scope.

6. What does the code below log?

   ```javascript
   "use strict"
   
   function func() {
     b = 1;
   }
   
   func();
   
   console.log(b);
   ```

   ##### Solution:

   Line 4 raises a `ReferenceError`. In strict mode, we don't have access to the global object as the implicit execution context. Thus, all variables have to be first declared before being used.