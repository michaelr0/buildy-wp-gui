export const findObj = async (store, id, section_index) => {
    let obj;
    
    if (section_index) {
        return obj = await Promise.resolve(searchJSON(store[section_index], id))
    } else if (store.length > 1) {  
        for (const section of store) {
            obj = await Promise.resolve(searchJSON(section, id))
            if (obj) {
                return obj;
            }
        }   
    } else {
        return obj = await Promise.resolve(searchJSON(store[0], id))
    }
}

function searchJSON(tree, target) {
    if (tree && tree.id === target) {
        return tree;
    }
    if (tree && tree.content && Array.isArray(tree.content)) {
        for (const child of tree.content) {
            
            const results = searchJSON(child, target);
            
            if (results) {
                return results
            }
                
        }
    }
}