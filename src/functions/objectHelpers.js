import Vue from 'vue'
/**
 * Dynamically sets reactive properties/values in deeply nested objects.
 * Optionally forces a path to it if its undefined. Values under Vue.set can be used for non-vue projects
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set (can be a whole state obj in vuex).
 * @param {!mixed} path  - Path to the value you want to change/set ['any','4','path'] or object dot notation "any.4.path"
 * @param {!mixed} value - The value you want to set it to.
 * @param {boolean} force - If true this will create the path/value if it doesn't already exist
 */
const setDeep = (obj, path, value, force = true) => {
      
    // If it's already an array, good game. Otherwise make it one from the .
    !Array.isArray(path) ? path = path.split('.') : path
    
    path.reduce((a, b, i) => {
        // Start index at 1
        i++

        // If the current path is a number, convert the string to an Int for array indexes
        b = isNaN(b) ? b : parseInt(b)
        
        // If force is enabled and it comes across an undefined path
        if (force && typeof a[b] === "undefined" && i !== path.length) {   
            // Set it as a new object reference
            Vue.set(a, b, {})
            // for non-vue apps a[b] = {}
            return a[b]
        }

        // If we are on the last step of reduce the value is set
        if (i === path.length) {
            Vue.set(a, b, value)
            // for non-vue apps a[b] = value;
            return value;
        } else {
            return a[b]
        }
    }, obj);
}

const getDeep = (obj, path) => {
    path = Array.isArray(path) ? path : path.split('.')
    return path.reduce((a, b) => a && a[b], obj);
}

export {setDeep, getDeep}