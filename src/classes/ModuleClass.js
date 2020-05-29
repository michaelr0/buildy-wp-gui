import { labelUCFirst } from '../functions/helpers';
import { generateModuleID } from '../functions/idHelpers';
import { setDeep } from '../functions/objectHelpers';

export class Module {
  constructor(options) {
    this.base = {
      id: (options && options.type) ? generateModuleID(options.type) : '',
      type: (options && options.type) ? options.type : '',
      content: [],
      options: {
        isEditable: true,
        admin_label: (options && options.type) ? labelUCFirst(options.type) : ''
      }
    }
    if (options && options.atts) {
      this.customAtts(options.atts)
    }
  }

  newGlobalSection(payload) {
    const base = JSON.parse(JSON.stringify(this.base))
    base.type = 'global-module'
    base.content = { id: payload.id }
    base.options.admin_label = payload.title.rendered
    return base
  }

  newSection() {
    const base = JSON.parse(JSON.stringify(this.base))
    base.type = 'section-module'
    base.id = generateModuleID(base.type)
    base.content = [this.newRow()]
    base.options.layout_boxed = true
    base.options.admin_label = labelUCFirst(base.type)
    return base
  }

  newRow() {
    const base = JSON.parse(JSON.stringify(this.base))
    base.type = 'row-module'
    base.id = generateModuleID(base.type)
    base.content = [this.newCol()]
    base.options.admin_label = labelUCFirst(base.type)
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
    base.options.admin_label = labelUCFirst(base.type)
    return base
  }

  newModule() {
    const base = this.base;
    base.content = {}
    return base
  }


  customAtts(atts) {
    const base = JSON.parse(JSON.stringify(this.base))
    base.content = {
      title: "",
      image: "",
      body: "",
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

  static changeModuleID(newID) {
    return this.id = newID
  }
}