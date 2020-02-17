import { mapState, mapGetters, mapActions } from 'vuex'
import { runInThisContext } from 'vm'

export default {
  methods: {
    ...mapActions(['updateModule', 'updateModuleNew', 'deleteModule', 'cloneModule']),
    cloneStoreComponent() {
      this.cloneModule({
          parent_id: this.parent_id,
          component_id: this.component.id,
      })
    },
    deleteStoreComponent() {
      this.deleteModule({
          parent_id: this.parent_id,
          component_id: this.component.id,
      })
    },
    updateStoreComponent({path, prop}) {
      this.updateModule({
          id: this.component.id,
          path,
          prop,
          section_index: this.section_index,
        })
    }
  },
  inject: ["component", "parent_id", "section_index",]
};