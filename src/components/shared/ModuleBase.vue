<template>
  <transition name="fadeHeight">
    <div class="module component-module rounded text-module relative flex flex-wrap items-center text-gray-400 p-1" :class="[bgcolor ? bgcolor : 'bg-gray-800']" :id="component.id" >
      
      <module-settings-bar></module-settings-bar>

      <p ref="adminLabel" contenteditable="true" @blur="updateStoreComponent({ path: 'options.admin_label', prop: $el.innerText})" class="mx-auto my-0 py-2">{{ admin_label }}</p>

      <slot /> 

    </div>
  </transition>
</template>

<script>
import ModuleSettingsBar from '../../components/shared/ModuleSettingsBar';
import componentCRUD from '../../mixins/componentCRUD';
import {EventBus} from '../../eventBus';

export default {
  props: {
    bgcolor: String
  },
  computed: {
    admin_label() {
      if (this.component.options && this.component.options.admin_label) {
        return this.component.options.admin_label
      } else {
        return this.component.type ? this.component.type : 'Placeholder for unknown component'
      }
    }
  },
  components: {
      ModuleSettingsBar,
  },
  mixins: [componentCRUD],
  mounted() {
    EventBus.$on(this.component.id+'-saveAll', () => {
      // this.updateStoreComponent({ path: 'options', prop: 'admin_label'}, this.$refs.adminLabel.innerText)
    })
  }
}
</script>
<style>
.component-module {
  transition: all 0.2s;
}
/* .fadeHeight-enter-active,
.fadeHeight-leave-active {
  opacity: 1;
  transition: all 0.2s;
  transform: translateY(0px);
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  transform: translateY(-30px);
  height: 0px;
} */

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>