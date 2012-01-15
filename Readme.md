This is basically the inheritance pattern used in Backbone so props to Jeremy Ashkenas and the Google Closure team:

* Pseudoclassical inheritence (see [this blog post](http://bolinfest.com/javascript/inheritance.php) for pros/cons of this approach).
* Ability to extend both prototype and Class methods.
* Ability to override the constructor.

In addition, this script adds:

* No 3rd-party dependencies.
* Built in support for calling `initialize` by the constructor.
* Will automatically extend simple objects, rather than replace them (useful for `options`, etc).
* Adds __name__ property to methods for introspection (ie for use with a call stack - see specs for usage).