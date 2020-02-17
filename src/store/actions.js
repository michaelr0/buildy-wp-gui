import { findObj } from '../functions/jsonSearch';
import { generateModuleID, recursifyID, generateID } from '../functions/idHelpers';
import { Module } from '../classes/ModuleClass';

export default {
    init(context, payload) {
        context.commit('init', JSON.parse(payload))
    },
    deleteSection(context, payload) {
        if (payload) {
            context.commit('deleteSection', payload)
        }
    },

    /* ------------------- Sections --------------------- */
    addSection(context) {
        let section = new Module();
            section = section.newSection();

        if (context.state.pagebuilder) {
            recursifyID(section)
            context.commit('addSection', section)
        }
    },
    addGlobalSection(context, payload) {
        let section = JSON.parse(JSON.stringify(GlobalSectionStructure));
            section.options.admin_label = payload.title.rendered;

            section.content = {id: payload.id}
            section.id = payload.id
        if (context.state.pagebuilder) {
            //recursifyID(section)
            context.commit('addGlobalSection', section)
        }
    },
    async addHR(context, payload) {
        const { parent_id } = payload
        let newObj = new Module({type: 'hr-module'})
        let newHR = newObj.newModule();
            newHR.id = generateModuleID(newHR.type)
            newHR.options.admin_label = "HR";

        if (context.state.pagebuilder) {
            //recursifyID(section)
            if (parent_id) {
                let row;

                if (parent_id) {
                    row = await findObj(context.state.pagebuilder, parent_id)             
                } 
                context.commit('addHRRow', {...payload, row, newHR})   
            } else {
                context.commit('addHRSection', newHR)
            }
        }
    },
    async cloneSection(context, payload) {
        const component_id = payload.component_id;
        let obj;

        if (component_id) {
            obj = await findObj(context.state.pagebuilder, component_id);
        }
        
        if (obj) {
            let clone = JSON.parse(JSON.stringify(obj)) 
            await recursifyID(clone);
            payload['clone'] = clone
            context.commit('cloneSection', payload)   
        }
    },         
       
    disableDrag(context, payload) {
        context.commit('disableDrag', payload)
    },

    /* ------------------- Rows --------------------- */
    async addRow(context, payload) {
        const { parent_id } = payload        

        if (parent_id) {
            const oldRow = await findObj(context.state.pagebuilder, parent_id)
            let newRow = new Module()
                newRow = newRow.newRow()
            recursifyID(newRow);
            context.commit('addRow', {...payload, oldRow, newRow});
        }
    },
    async deleteRow(context, payload) {
        const { parent_id, component_id } = payload
        let section = await findObj(context.state.pagebuilder, parent_id)               
        
        if (section && component_id) {
            context.commit('deleteRow', {...payload, section})
            if (!section.content.length) {
                context.commit('deleteSection', section.id)
            }
        }
    },
    async cloneRow(context, payload) {
        const { component_id, parent_id } = payload     
        let row,
            section

        if (component_id) {
            section = await findObj(context.state.pagebuilder, parent_id)                
            row = await findObj(context.state.pagebuilder, component_id)                
        } 

        if (row) {
            let clone = JSON.parse(JSON.stringify(row)) 
            await Promise.resolve(recursifyID(clone));
            context.commit('cloneRow', {...payload, section, clone})   
        }
    },
    async changeColumnLayout(context, payload) {
        const {newLayout, id} = payload
        let obj = await findObj(context.state.pagebuilder, id)                
        newLayout.forEach(column => {
            column.id = generateModuleID(column.type)
        })
                
        if (obj) {
            payload['rowLength'] = obj.content.length
            payload.row = obj
            context.commit('changeColumnLayout', payload)
        }
    },

    /* ------------------- Columns --------------------- */
    async decrementCol(context, payload) {
        const { component_id, size } = payload
        let column = await findObj(context.state.pagebuilder, component_id) 

        // If the value for this size is currently empty, start from medium
        if (!column.options.columns[size]) {
            column.options.columns[size] = column.options.columns.md
        }

        if (column && column.options.columns[size] && column && column.options.columns[size] > 1) {
            context.commit('decrementCol', {...payload, column})
        }        
    },
    async incrementCol(context, payload) {
        const { component_id, size } = payload
        let column = await findObj(context.state.pagebuilder, component_id)

        // If the value for this size is currently empty, start from medium
        if (!column.options.columns[size]) {
            column.options.columns[size] = column.options.columns.md
        }

        if ((column && column.options.columns[size]) && (column && column.options.columns[size] < 12)) {
            context.commit('incrementCol', {...payload, column})
        }    
    },

    /* ------------------- Modules --------------------- */
    async addModule(context, payload) {
        const { module, parent_id } = payload
        let col = await findObj(context.state.pagebuilder, parent_id)

        if (!module.id) {
            module.id = await Promise.resolve(generateModuleID(module.type))
        }
        context.commit('addModule', {...payload, module, col})   
    }, 
    async updateModule(context, payload) {
        const { id, section_index, row_index, column_index} = payload
        let stateObj;

        // If section index is provide, the stateObj is optimized
        if (section_index !== 'undefined') {
            stateObj = await findObj(context.state.pagebuilder, id, section_index)            
        } else {
            stateObj = await findObj(context.state.pagebuilder, id) 
        }
        context.commit('updateModule', {...payload, stateObj})
    },  
    async cloneModule(context, payload) {
        const { component_id, parent_id } = payload;        
        let module,
            col;

        if (component_id && parent_id) {
            module = await findObj(context.state.pagebuilder, component_id) 
            col = await findObj(context.state.pagebuilder, parent_id)              
        }

        if (module && col) {
            const clone = JSON.parse(JSON.stringify(module)) 
            clone.id = generateModuleID(clone.type)
            context.commit('cloneModule', {...payload, col, clone})   
        }
    }, 
    async deleteModule(context, payload) {
        const { parent_id, component_id } = payload
        let col = await findObj(context.state.pagebuilder, parent_id);
        if (col) {
            context.commit('deleteModule', {...payload, col})
        } else {
            context.commit('deleteModule', {...payload, col: false})
        }    
    },

    async sibbling_link(context, payload) {
        const { row_id } = payload
        let obj = await findObj(context.state.pagebuilder, row_id)
        if (Array.isArray(obj.content)) {
            let siblings = obj.content
            context.commit('sibling_link', {...payload, siblings})
        }   
    },
    
    UPDATE_BREAKPOINT_ATT({commit}, payload) {
        if (!payload || !payload.val) {
            return console.log('There was no breakpoint attribute to commit')
        }
        commit('UPDATE_BREAKPOINT_ATT', payload);
    }
  }