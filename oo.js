(function(Class){
    var base, ctor, extend, inherits, root = this;
    base = function(){
        this.initialize.apply(this, arguments);
    };
    base.prototype = {
        initialize: function(){}
    }
    base.extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };
    extend = function(obj, source) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var objProp = obj[prop], sourceProp = source[prop], object = '[object Object]';
                if (toString.call(objProp) === object && toString.call(sourceProp) === object) {
                    extend(objProp, sourceProp);
                }
                else {
                    if (typeof sourceProp === 'function') {
                        sourceProp.__name__ = prop;
                    }
                    obj[prop] = sourceProp;
                }
            }
        }
    };
    ctor = function(){};
    inherits = function(parent, protoProps, classProps) {
        var child = protoProps && protoProps.hasOwnProperty('constructor') ? protoProps.constructor
            : function(){ return parent.apply(this, arguments) };
        extend(child, parent);
        ctor.prototype = child.__super__ = parent.prototype;
        child.prototype = new ctor;
        protoProps && extend(child.prototype, protoProps);
        classProps && extend(child, classProps);
        child.prototype.constructor = child;
        return child;
    };
    root[Class] = base;
})('Class');