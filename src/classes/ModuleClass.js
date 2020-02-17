import { generateModuleID } from '../functions/idHelpers';
import { setDeep } from '../functions/objectHelpers';

export class Module {
    constructor(options) {
        this.base = {
            id: (options && options.type) ? generateModuleID(options.type) : '',
            type: (options && options.type) ? options.type : '',
            attributes: {
                id:"",
                class: ""
            },
            inline: {
                background_image: "",
                background_color: "",
                margin: {
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                },
                padding: {
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }
            },
            content: [],
            options: {
                isEditable: true,
                admin_label: (options && options.type) ? this.LabelUCFirst(options.type) : ''
            }
        } 
        if (options && options.atts) {
            this.customAtts(options.atts)
        }
    }

    globalSection() {
        return {
            "id":"",
            "type":"global-module",
            "content": [],
            "options":{
                "isEditable": false,
                "admin_label": "Global Section"
            }
        }
    }

    newSection() {
        const base = JSON.parse(JSON.stringify(this.base))
        base.type = 'section-module'
        base.id = generateModuleID(base.type)
        base.content = [this.newRow()]
        base.options.layout_boxed = true
        base.options.admin_label = this.LabelUCFirst(base.type)
        return base
    }

    newRow() {
        const base = JSON.parse(JSON.stringify(this.base))
        base.type = 'row-module'
        base.id = generateModuleID(base.type)
        base.content = [this.newCol()]
        base.options.admin_label = this.LabelUCFirst(base.type)
        return base
    }

    newCol() {
        const base = JSON.parse(JSON.stringify(this.base))
        base.type = 'column-module'
        base.id = generateModuleID(base.type)
        base.options.columns = {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "lg": 12,
            "xl": 12
        }
        base.options.admin_label = this.LabelUCFirst(base.type)
        return base
    }

    newModule() {
        const base = this.base
        base.content = {
            title: "",
        }
        return this.base
    }


    customAtts(atts) {
        const base = JSON.parse(JSON.stringify(this.base))
        base.content = {
            title: "",
        }
        atts.forEach(att => {
            if (att.path && att.props) {
                const entries = Object.entries(att.props)
                for (const [key, val] of entries) {
                    let path = att.path + `.${key}`
                    setDeep(base, path, val, true)
                    // console.log('base', this.base)
                }
            }
        })        
        return base
    }

    // customAtts(atts) {
    //     if (typeof atts !== 'object') {
    //         const entries = Object.entries(atts)
    //         for (const [key, val] of entries) {
    //             return console.log(key, val)
    //             this.base[path][key] = val
    //         }
    //     } else {
    //         const root = Object.entries(atts)
    //         for (const [object, values] of root) {
    //             if (typeof values === 'object') {
    //                 this.customAtts(values)
    //             }
    //         }
    //     } 
    // }

    moduleLabel(type) {
        return type.replace('-module', '')
    }

    LabelUCFirst(type) {
        let label = type.replace('-module', '')
        return label.charAt(0).toUpperCase() + label.slice(1)
    }

    static changeModuleID(newID) {
        return this.id = newID
    }
}