var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

exports.ClassTransition = ReactCSSTransitionGroup;

exports.map = function(array, fn) {
    return $.map(array, fn); // TODO what's the 'best' map function?
};

exports.choose = function(val, options) {
    return options[val];
};

exports.when = function(condition, fn, otherwise) {
    if(condition) {
        return fn();
    }
    if(otherwise) {
        return otherwise();
    }
    return null;
};

exports.isDescendant = function(parent, child) {
    var node = child.parentNode;
    while(node !== null) {
        if(node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

exports.eachProp = function(obj, handler) {
    for(var prop in obj) {
        handler(prop);
    }
};

exports.isArray = function(o) {
    return o && o.constructor === Array;
};

exports.isString = function(o) {
    return o && (o instanceof String || typeof(o) === 'string');
};

exports.truncate = function(s, sz) {
    return s.length > sz ? (s.substring(0,sz-3) + '...') : s;
};

/**
 * JSON.stringify, short-circuit on circular references
 */
exports.stringify = function(o) {
    var output = [];
    return json.stringify(o, function(key, value) {
        if(value instanceof Object) {
            if(output.indexOf(value) >= 0) {
                return ' ** ';
            }
            output.push(value);
        }
        return value;
    });
};

/**
 * Get children of a specific type
 */
exports.getChildrenOfType = function(children, type) {
    var renderedChildren = null;
    React.Children.forEach(children, function(child,i) {
        if(!child) {
            return;
        }
        if(child.type && child.type == type) {
            if(!renderedChildren) {
                renderedChildren = child;
            }
            else {
                if(!(renderedChildren instanceof Array)) {
                    renderedChildren = [renderedChildren];
                }
                renderedChildren.push(child);
            }
        }
    });
    return renderedChildren;
};

/**
 * Get children of a specific type
 */
exports.eachChildOfType = function(children, type, fn) {
    var renderedChildren = null;
    React.Children.forEach(children, function(child,i) {
        if(!child) {
            return;
        }
        if(child.type && child.type == type) {
            if(!renderedChildren) {
                renderedChildren = fn(child);
            }
            else {
                if(!(renderedChildren instanceof Array)) {
                    renderedChildren = [renderedChildren];
                }
                renderedChildren.push(fn(child));
            }
        }
    });
    return renderedChildren;
};

/**
 * Determines if the variable is 'empty'
 */
exports.isEmpty = function(val) {
    if(debug) console.log('is empty ' + val);
    return val === undefined || val === null || val === '';
};

/**
 * Get children of a specific type
 */
exports.getChildrenExclduingType = function(children, type) {
    var renderedChildren = null;
    React.Children.forEach(children, function(child,i) {
        if(!child) {
            return;
        }
        if(child.type && child.type != type) {
            if(!renderedChildren) {
                renderedChildren = child;
            }
            else {
                if(!(renderedChildren instanceof Array)) {
                    renderedChildren = [renderedChildren];
                }
                renderedChildren.push(child);
            }
        }
    });
    return renderedChildren;
};
