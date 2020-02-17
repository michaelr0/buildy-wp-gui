<template>
  <div :id="component.id" class="section bg-gray-400 mb-5 flex flex-wrap" :class="[settingsOpen ? 'highlight-section' : '']">
    <div class="settings-bar section-settings px-2 bg-blue-500 items-stretch">
      <ul class="list-unstyled flex flex-col h-full">
        <li class="py-2 flex items-center">
          <menu-icon  @click="openSectionSettings" class="text-white cursor-pointer" size="1.5x"></menu-icon>
        </li>
        <li class="py-2 flex items-center">
          <copy-icon @click="cloneSectionClick" class="text-white cursor-pointer" size="1.5x"></copy-icon>
        </li>
        <li class="py-2 flex items-center">
          <trash-2-icon @click="deleteSectionClick" class="text-white cursor-pointer" size="1.5x"></trash-2-icon>
        </li>
      </ul>
    </div>

    <settings-modal :component="component">
      <toggle-switch label="Boxed layout" slot="options" path="options.layout_boxed" :status="component.options.layout_boxed"></toggle-switch>  
    </settings-modal> 

    <div class="flex-1 flex-col">
      <draggable :list="dragArray" v-bind="dragOptions">
        <transition-group name="fadeHeight" tag="div" class="section-inner p-6 pb-2 flex-col flex-wrap flex-1">
          <template v-for="(component, index) in dragArray">
            <row-module
              v-if="component.type === 'row-module'" 
              :class="[(rowCount > 1) && index !== (rowCount -1) ? 'mb-6' : 'mb-0']" 
              :colcount="columns(component.content)" 
              :key="component.id" 
              :components="component.content" 
              :parent_id="selfID" 
              :component="component"></row-module>  
              <hr-module :key="component.id" :component="component" :parent_id="selfID" v-else />
          </template>
        </transition-group>
      </draggable>
      <div class="p-4 pt-0 pb-2 text-center empty-controls flex justify-center">
        <a @click.prevent="addRowClick" class="flex w-auto mx-6 items-center justify-center" href="#"><plus-circle-icon class="mr-2"></plus-circle-icon> Add empty row</a>  
        <a @click.prevent="addHRClick" class="flex w-auto items-center justify-center" href="#"><plus-circle-icon class="mr-2"></plus-circle-icon> Add HR</a>  
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { PlusCircleIcon, MenuIcon, Trash2Icon, CopyIcon } from 'vue-feather-icons';
import RowModule from '../layout/rows/RowModule';
import HRModule from '../HRModule';
import draggable from 'vuedraggable';
import SettingsModal from '../shared/SettingsModal';
import ToggleSwitch from '../shared/ToggleSwitch';
import InlineStyleEditor from '../../components/shared/InlineStyleEditor';
import AttributeEditor from '../shared/AttributeEditor';
import {EventBus} from '../../eventBus'
  export default { 
    name: 'section-module',
    data: function() {
      return {
        defaultColor: '#ffffff',
        settingsOpen: false,
        dragArray: this.components,
        hovering: false,
      }
    },
    provide() {
        return {
            component: this.component,
            parent_id: this.parent_id
        }
    },
    computed: {
      ...mapGetters(['dragging']),
      dragOptions() {
        return {
          group: "rows",
          ghostClass: "ghost",
          disabled: this.dragging
        }
      },
      selfID() {
        return this.component.id
      },
      rowCount() {
        return this.dragArray.length;
      },
    },
    components: {
      SettingsModal,
      ToggleSwitch,
      InlineStyleEditor,
      AttributeEditor,
      draggable,
      RowModule,
      "hr-module": HRModule,
      PlusCircleIcon,
      MenuIcon,
      Trash2Icon,
      CopyIcon,
    },
    methods: {
      ...mapActions(['cloneSection', 'deleteSection', 'addRow', 'addHR']),
      cloneSectionClick() {
        this.cloneSection({
          parent_id: this.parent_id,
          component_id: this.component.id, 
        })
      },
      deleteSectionClick() {
        this.deleteSection({
          component_id: this.component.id, 
        })
      },
      openSectionSettings() {
        this.$modal.show(this.component.id);
      },
      addRowClick(){
        this.addRow({          
          parent_id: this.component.id
        })
      },
      addHRClick(){
        this.addHR({          
          parent_id: this.component.id
        })
      },
      columns(component) {
        var totalCols = 0;
        component.forEach(col => {
          totalCols += col.options.colspan;
        })
        return totalCols;
      }    
    },
    provide() {
      return {
        section_index: this.section_index,
        component: this.component,
        row_id: null,
        parent_id: null
      }
    },
    props: {
      section_index: Number,
      component: Object,
      components: Array,
      componentType: String,
    },
  }
</script>

<style scoped>
.section {
  transition: all 0.2s;
}
.highlight-section {
  animation-name: colorPulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes colorPulse {
  0% {
    background-color: #cbd5e0;
  }
  50% {
    background-color: #4299e1;
  }
  100% {
    background-color: #cbd5e0;
  }
}
</style>