JS-OO
===================

This is basically the inheritance pattern used in Backbone so props to [Jeremy Ashkenas](https://github.com/jashkenas) and the [Google Closure](http://code.google.com/closure/) team:

* Pseudoclassical inheritence (see [this blog post](http://bolinfest.com/javascript/inheritance.php) for pros / cons of this approach).
* Ability to extend both prototype and Class methods.
* Ability to override the `constructor`.

In addition, this script adds:

* No 3rd-party dependencies.
* Built in support for calling `initialize` by the constructor.
* Will automatically extend simple objects, rather than replace them (useful for _options_, etc).
* Adds `__name__` property to methods for introspection (ie for use with a call stack - see specs for usage).

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

Advanced Usage
-------------------
