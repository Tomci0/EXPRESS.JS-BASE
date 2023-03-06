let cache = {};

module.exports = {
    get: function(key) {
        return cache[key];
    },
    add: function(key, value) {
        cache.push(value);
    },
    set: function(key, value) {
        cache[key] = value;
    },
    delete: function(key) {
        delete cache[key];
    },
    clear: function() {
        cache = {};
    },
}