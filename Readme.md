JS-OO
===================

This is basically the inheritance pattern used in Backbone so props to [Jeremy Ashkenas](https://github.com/jashkenas) and the [Google Closure](http://code.google.com/closure/) team:

* Pseudoclassical inheritence (see [this blog post](http://bolinfest.com/javascript/inheritance.php) for pros / cons of this approach).
* Ability to extend both prototype and Class methods.
* Ability to override the `constructor`.

In addition, this script adds:

* No 3rd-party dependencies.
* Built in support for calling `initialize` by the constructor.
* Will automatically extend simple objects, rather than replace them.
* Adds `__name__` property to methods for introspection (ie for use with a call stack - see below for example).
* Only __677 bytes__ minified.

Basic Usage
-------------------

    var Droid = Class.extend({
        initialize: function(name){
            this.name = name;
        }
    });
    var r2d2 = new Droid('R2-D2');
    console.log(r2d2.name);
    // R2-D2

    var ProtocolDroid = Droid.extend({
        model: 'protocol'
    });
    var c3po = new ProtocolDroid('C-3PO');
    console.log(c3po.name);
    // C-3PO
    console.log(c3po.model);
    // protocol
    console.log(c3po instanceof ProtocolDroid);
    // true
    console.log(c3po instanceof Droid);
    // true

Advanced Usage
-------------------

### Calling Super Methods ###

Super methods are available through the `__super__` property of the class:

    var Droid = Class.extend({
        initialize: function(name){
            this.name = name;
        }
    });
    var AstromechDroid = Droid.extend({
        initialize: function(name){
            Droid.__super__.initialize.apply(this, arguments);
        }
    });
    var r2d2 = new AstromechDroid('R2-D2');
    console.log(r2d2.name);
    // R2-D2

### Extending Simple Objects ###

Simple Javascript objects are _extended_ rather than replaced with inheritance. In this example the `alliance` property of the parent `options` is preserved after the class is extended:

    var Droid = Class.extend({
        options: {
            alliance: 'rebel'
        }
    });
    var AstromechDroid = Droid.extend({
        options: {
            model: 'astromech'
        }
    });
    var r2d2 = new AstromechDroid;
    console.log(r2d2.options.alliance);
    // rebel

### Extending The Constructor ###

In most cases you probably only want to extend the `initialize` method, but you can also extend the `constructor` itself. In this example the constructor is replaced with an empty function. Since the constructor is responsible for calling `initialize` that method is never called.

    var Droid = Class.extend({
        constructor: function() {},
        initialize: function(name){
            this.name = name;
        }
    });
    var r2d2 = new AstromechDroid('R2-D2');
    console.log(r2d2.name);
    // undefined

### Introspection ###

Probably the nicest thing about this approach, is even though all class methods are anonymous functions, their _name_ is available through the `__name__` property of the function:

    var Droid = Class.extend({
        initialize: function(){
            this.bootUp();
        },
        bootUp: function() {
            this.loadKernel();
        },
        loadKernel: function() {
            this.autoProbe();
        },
        autoProbe: function() {
            console.log(arguments.callee.__name__)
            console.log(arguments.callee.caller.__name__);
            console.log(arguments.callee.caller.caller.__name__);
            console.log(arguments.callee.caller.caller.caller.__name__);
        }
    });
    new Droid;
    // autoProbe
    // loadKernel
    // bootUp
    // initialize

This allows us to do things like cross-browser stack traces:

    var Trace = function() {
        var stack = [], caller = arguments.callee.caller;
        while(caller) {
            stack.push({ method: caller.__name__, parameters: caller.arguments });
            caller = caller.caller;
        }
        console.log(stack);
    }
    var Droid = Class.extend({
        initialize: function(){
            this.bootUp(0);
        },
        bootUp: function(i) {
            this.loadKernel(i + 1);
        },
        loadKernel: function(i) {
            this.autoProbe(i + 1);
        },
        autoProbe: function(i) {
            throw new Trace;
        }
    });
    new Droid;
    // [
    //     { method: 'autoProbe', parameters: [ 2 ] },
    //     { method: 'loadKernel', parameters: [ 1 ] },
    //     { method: 'bootUp', parameters: [ 0 ] },
    //     { method: 'initialize', parameters: [] },
    //     ...
    // ]