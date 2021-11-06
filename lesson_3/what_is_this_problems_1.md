##### JS225 > Function Contexts and Objects

---

# Practice Problems: What is this? (1)

Be sure to use Chrome Snippets for this assignment.

1. What does `this` point to in the code below?

   ```javascript
   function whatIsMyContext() {
     return this;
   }
   ```

   - ##### Solution

     We won't know the context of a function until execution time. Thus, we don't know what the context is here.

2. What does `this` point to in the code below?

   ```javascript
   function whatIsMyContext() {
     return this;
   }
   
   whatIsMyContext();
   ```

   - ##### Solution

     Function calls set the execution context to the **implicit global object**, or global context for short. When we use the global object implicitly to call a function, we call it with the **global context**.

     Functions called inside a browser environment use the `window` object as the implicit global context, so `this` is the `window` object inside the function.

     In strict mode, however, the global context is the value `undefined`.

3. What does `this` point to in the code below?

   ```javascript
   function foo() {
     function bar() {
       function baz() {
         console.log(this);
       }
   
       baz();
     }
   
     bar();
   }
   
   foo();
   ```

   - ##### Solution

     Since we call `baz` with the implicit global context, `this` is the `window` object.

4. What does `this` point to in the code below?

   ```javascript
   let obj = {
     count: 2,
     method() {
       return this.count;
     },
   };
   
   obj.method();
   ```

   - ##### Solution

     Since we call `method` on object `obj`, `this` is the object `obj`. Thus, the return value will be `2`.

5. In strict mode, what does the following program log to the console?

   ```javascript
   function foo() {
     console.log(this.a);
   }
   
   let a = 2;
   foo();
   ```

   - ##### Solution

     It raises an error. Since the function is called without an explicit object, `this` inside `foo` resolves to the global execution context, which is `undefined` in strict mode. The code raises an error because, in effect, we're trying to access the nonexistent `a` property of `undefined`.

6. What does the following program log to the console?

   ```javascript
   let a = 1;
   function bar() {
     console.log(this.a);
   }
   
   let obj = {
     a: 2,
     foo: bar,
   };
   
   obj.foo();
   ```

   - ##### Solution

     ```plaintext
     2
     ```

     Line 11 calls method `foo` with its context set to `obj` since the execution context for any method invoked without an explicit context provided is the calling object.

7. What does the following code log to the console?

   ```javascript
   let foo = {
     a: 1,
     bar() {
       console.log(this.baz());
     },
   
     baz() {
       return this;
     },
   };
   
   foo.bar();
   let qux = foo.bar;
   qux();
   ```

   - ##### Solution

     ```javascript
     Object {a: 1, bar: f, baz: f}
     Uncaught TypeError: this.baz is not a function
     ```

     Executing from line 12 sets `this` in `bar` to the `foo` object (via implicit method execution context). From the body of the `bar` method, it then calls `foo`'s `baz` method. `baz` returns `foo` since it has `foo`'s context (again via implicit method execution context; `this` === `foo` following the execution from line 12), which causes line 4 to log `foo`.

     Line 14 calls `bar` as a function in the global context, `window`; since `baz` doesn't exist in `window`, JavaScript raises an error.