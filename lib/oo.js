// Based on OO - Class - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)
// which is based on http://ejohn.org/blog/simple-javascript-inheritance/
// based on implementations by Prototype / base2

;(function(){
  var global = this, initialize = true, referencesSuper = /xyz/.test(function(){ xyz }) ? /\b__super__\b/ : /.*/;

  Class = function(props){
    if (this == global) return Class.extend(props); 
  }
  
  Class.extend = function(props){
    var __super__ = this.prototype;
    initialize = false
    var prototype = new this;
    initialize = true;

    function Class(){
      if (initialize && this.init) this.init.apply(this, arguments);
    }
    
    Class.include = function(props){
      for (var name in props){
        if (name == 'include'){
          var prop = chi.splat(props[name]), i = 0, len = prop.length;
          for (; i < len; ++i) Class.include(val[i])
        }
        else if (name == 'extend'){
          var prop = chi.splat(props[name]), i = 0, len = prop.length;
          for (; i < len; ++i) chi.extend(Class, val[i])
        }
        else if (props.hasOwnProperty(name)){
          props[name].__name__ = name;
          if (typeof props[name] == 'function' && typeof __super__[name] == 'function' && referencesSuper.test(props[name])){
            prototype[name] = (function(name, fn){ 
              return function(){
                this.__super__ = __super__[name]; 
                return fn.apply(this, arguments) }
              })(name, props[name]);
          }
          else if (chi.isObject(props[name]) && chi.isObject(__super__[name])){
            prototype[name] = chi.extend({}, __super__[name], props[name]);
          }
          else prototype[name] = props[name];
        }
      }
    }
    
    Class.include(props);
    Class.prototype = prototype;
    Class.constructor = Class;
    Class.extend = arguments.callee;
    
    return Class;
  }
})();