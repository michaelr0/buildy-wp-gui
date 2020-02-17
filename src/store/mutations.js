import Vue from 'vue';
import {findObj} from '../functions/jsonSearch';
import {setDeep} from '../functions/objectHelpers';

export default {
    init(state, payload) {
        state.pagebuilder = payload.content;
        state.global_api = payload.global_api;
        state.site_url = payload.site_url;      
    },
    
    /* ------------------- Sections --------------------- */
    addSection(state, payload) {
        state.pagebuilder.push(payload);
    },
    addGlobalSection(state, payload) {
        state.pagebuilder.push(payload);
    },
    addHRSection(state, payload) {
        state.pagebuilder.push(payload);
    },
    deleteSection(state, { component_id }) {
        let sectionIndex = state.pagebuilder.findIndex(x => x.id === component_id);
        state.pagebuilder.splice(sectionIndex, 1)
    },
    cloneSection(state, { parent_id, component_id, clone }) {
        let sectionIndex = state.pagebuilder.findIndex(x => x.id === component_id);
        state.pagebuilder.splice(sectionIndex+1, 0, clone);
    },   

    /* ------------------- Rows --------------------- */
    addRow(state, {oldRow, newRow}) {
        oldRow.content.push(newRow)
    },
    addHRRow(state, { row, newHR }) {
        row.content.push(newHR)
    },
    cloneRow(state, { component_id, section, clone }) {
        let rowIndex = section.content.findIndex(x => x.id === component_id);
        section.content.splice(rowIndex+1, 0, clone);
    },
    deleteRow(state, { component_id, section }) {
        let rowIndex = section.content.findIndex(x => x.id === component_id);        
        section.content.splice(rowIndex, 1)
    },
    changeColumnLayout(state, { rowLength, newLayout, row }) {                
        // Check if there are already modules inside
        let oldModules = [];

        if (rowLength) {
            row.content.forEach(component => {
                if(component.content.length) {
                    component.content.forEach(module => {
                        oldModules.push(module)
                    });
                    component.content = []
                }
            })    
        }
        // Change column layout
        row.content.splice(0, rowLength, ...newLayout);

        // Add old modules to new layout
        row.content[0].content = oldModules
 
    },

    /* ------------------- Columns --------------------- */
    decrementCol(state, { column, size }) {
        if (size) {
            column.options.columns[size]--
        } else {
            column.options.columns.md--
        }
    },
    incrementCol(state, { column, size }) {
        if (size) {
            column.options.columns[size]++
        } else {
            column.options.columns.md++
        }
    },

    /* ------------------- Modules --------------------- */
    addModule(state, { module, col }) {
        col.content.push(module);
    },  
    cloneModule(state, { component_id, col, clone }) {
        if (col) {            
            let moduleIndex = col.content.findIndex(x => x.id === component_id);
            col.content.splice(moduleIndex+1, 0, clone);
        } else  {
            let moduleIndex = state.pagebuilder.findIndex(x => x.id === component_id);
            state.pagebuilder.splice(moduleIndex+1, 0, clone);
        }    
    },  
    updateModule(state, { stateObj, path, prop }) {
        // Set object on properies
        setDeep(stateObj, path, prop, true)
    },
    deleteModule(state, { component_id, col }) {
        // Nested Module
        if (col) {
            let moduleIndex = col.content.findIndex(x => x.id === component_id)
            col.content.splice(moduleIndex, 1)
          // Root module (e.g HR)
        } else {
            let moduleIndex = state.pagebuilder.findIndex(x => x.id === component_id);
            state.pagebuilder.splice(moduleIndex, 1);
        }
    }, 

    sibling_link(state, { data, path, prop, siblings }) {
        siblings.forEach(sibling => {
            let el = sibling.content[0]
            if (el) {
                el[path][prop] = data
                el = el
            }
            
        })
    },

    /* ------------------- Global --------------------- */
    disableDrag(state, payload) {
        state.dragging = payload
    },

    async UPDATE_BREAKPOINT_ATT(state, {parent_id, rootpath, subpath, size, val}) {
        let obj;

        if (parent_id) {
            obj = await findObj(state.pagebuilder, parent_id);
        }

        if (!obj) {
            return console.log('There was an issue finding the obj for breakpoint mutation')
        }
        obj[rootpath][subpath][size] = parseInt(val)
    }
}