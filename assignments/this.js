/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window Binding
* 2. Implicit Binding
* 3. New Binding
* 4. Explicit Binding
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
    function whereAmI() {
        console.log("I am stuck in the Window");
        console.log(this);
    }
    whereAmI();
// Principle 2

// code example for Implicit Binding
    const obj_imp = {
        sayMyPurpose: function() {
            console.log("My purpose is to demonstrate implicit binding");
            console.log(this);
        }
    }
    obj_imp.sayMyPurpose();

// Principle 3

// code example for New Binding
    function Obj_newBinding (newBinding) {
        this.order = newBinding.order;
        this.sayMyPurpose = function() {
            console.log("My purpose is to demonstrate new binding");
            console.log(this);
        }
    }
    const newBinding = new Obj_newBinding({order:"parent"});
    newBinding.sayMyPurpose();

// Principle 4

// code example for Explicit Binding
    function Obj_babyNewBinding(babyNewBinding) {
        Obj_newBinding.call(this, babyNewBinding);
        this.newSkills = function () {
            console.log("I am here to demonstrate that I can do everything newBinding OBJ can do, and some more");
            console.log(this);
        }
    }
    Obj_babyNewBinding.prototype = Object.create(Obj_newBinding.prototype);

    const newBaby = new Obj_babyNewBinding({order:"child"});
    newBaby.newSkills();
