##### JS225 > Function Contexts and Objects

---

# Practice Problems: Hard Binding Functions with Contexts

1. What function can we use to permanently bind a function to a particular execution context?

   - **Solution**

     We can use the `Function` method `bind` to permanently bind a function to an execution context.

2. What will the code below log to console?

   ```jsx
   let obj = {
     message: 'JavaScript',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   foo.bind(obj);
   ```

   - **Solution**

     Nothing. Unlike `call` and `apply`, `bind` doesn't invoke the receiver function. Rather, it *returns a new function* that is permanently bound to the context argument.

3. What will the code below output?

   ```jsx
   let obj = {
     a: 2,
     b: 3,
   };
   
   function foo() {
     return this.a + this.b;
   }
   
   let bar = foo.bind(obj);
   
   console.log(bar());
   ```

   - **Solution**

     ```jsx
     5
     ```

     `foo` is explicitly bound to `obj` on line 10, and as a result references that object's properties `a` and `b` when it is invoked.

4. What will the code below log to the console?

   ```jsx
   let positiveMentality = {
     message: 'JavaScript makes sense!',
   };
   
   let negativeMentality = {
     message: 'JavaScript makes no sense!',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   let bar = foo.bind(positiveMentality);
   
   negativeMentality.logMessage = bar;
   negativeMentality.logMessage();
   ```

   - **Solution**

     ```jsx
     JavaScript makes sense!
     ```

     Since `bar` is bound to `positiveMentality` as the return value of the `bind` invocation on line 13, `positiveMentality`'s property `message` is logged by the function call on the last line, despite the fact that the function is invoked as a method on the `negativeMentality` object.

5. What will the code below output?

   ```jsx
   let obj = {
     a: 'Amazebulous!',
   };
   let otherObj = {
     a: "That's not a real word!",
   };
   
   function foo() {
     console.log(this.a);
   }
   
   let bar = foo.bind(obj);
   
   bar.call(otherObj);
   ```

   - **Solution**

     ```jsx
     Amazebulous!
     ```

     Once a function has been bound to an execution context with `bind`, its context can't be changed, even explicitly. In keeping with this, the last line of our code outputs `Amazebulous!`, because the function `bar` has been bound to `obj`. Thus, inside of `bar`, `this` points to `obj` when `bar` is invoked on the last line, rather than `otherObj`, despite the fact that the function is being invoked by `call` with `otherObj` as the explicit context argument.