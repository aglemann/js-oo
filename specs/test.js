module('js-oo');

test('Class', function() {
    ok(Class, 'Class exists in global space');
    
    var instance = new Class;    
    ok(instance, 'Class instanced without error');
});

test('extend', function() {
    var Human = Class.extend({
        attributes: {
            sex: '',
            species: 'human'
        },
        initialize: function(name, attributes) {
            this.name = name;
            if (attributes) {
                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        this.attributes[attr] = attributes[attr];
                    }
                }
            }
        }
    });
    
    ok(Human, 'Class extended without error');
    
    var nate = new Human('Nate', { sex: 'male' });    
    ok(nate, 'Human instanced without error');    
    equal(nate.name, 'Nate', 'Initialize executed on instance');
    equal(nate.attributes.sex, 'male', 'Initialize extended without error');
    
    Human.reproduce = function() {
        return new this;
    }

    var Woman = Human.extend({
        attributes: {
            sex: 'female'
        },
        initialize: function() {
            Woman.__super__.initialize.apply(this, arguments);
        }
    });
    
    var keylin = new Woman('Keylin');
    equal(keylin.name, 'Keylin', 'Super method called without error');
    equal(keylin.attributes.sex, 'female', 'Attributes object extended');
    equal(keylin.attributes.species, 'human', 'Original values preserved');
    
    var woman = Woman.reproduce();
    ok(woman instanceof Woman, 'Class method called without error');
    
    var Man = Human.extend({
        attributes: {
            sex: 'female'
        }
    }, {
        reproduce: function() {
            return null;
        }
    });
    
    var man = Man.reproduce();
    ok(!man, 'Class method extended without error');    
});

test('constructor', function() {
    var Droid = Class.extend({
        constructor: function() {
            this.initialize('R2D2');
        },
        initialize: function(name) {
            this.name = name;
        }
    });    
    var r2d2 = new Droid;
    equal(r2d2.name, 'R2D2', 'Constructor replaced on extend');    
});

test('instanceof', function() {
    var Droid = Class.extend();    
    var r2d2 = new Droid;
    ok(r2d2 instanceof Droid, 'Instanceof works as expected');
    
    var ProtocolDroid = Droid.extend();
    var c3po = new ProtocolDroid;
    ok(c3po instanceof ProtocolDroid, 'Instanceof works as expected');
    ok(c3po instanceof Droid, 'Instanceof works as expected');
});

test('trace', function() {
    var Human = Class.extend({
        initialize: function() {
            this.drink();
        },
        drink: function() {
            this.puke();
        },
        puke: function() {
            equal(arguments.callee.caller.__name__, 'drink', 'Method name available from __name__');
            equal(arguments.callee.caller.caller.__name__, 'initialize', 'Method name available from __name__');
        }
    });
    
    new Human;
});