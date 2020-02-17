<template>
  <div :id="component.id" class="bg-gray-300 mx-0 flex flex-wrap" :class="[settingsOpen ? 'highlight-row' : '']" >
    
    <div class="settings-bar row-settings px-2 bg-green-500 items-stretch">
      <ul class="list-unstyled flex flex-col h-full">
        <li class="py-1 flex items-center">
          <menu-icon @click="openRowSettings" class="text-white cursor-pointer" size="1.5x"></menu-icon>
        </li>
        <li class="py-1 flex items-center">
          <columns-icon @click="$modal.show(component.id+'-column-layouts')" class="text-white cursor-pointer" size="1.5x"></columns-icon>
        </li>
        <li class="py-1 flex items-center">
          <copy-icon @click="cloneRowClick" class="text-white cursor-pointer" size="1.5x"></copy-icon>
        </li>
        <li class="py-1 flex items-center">
          <trash-2-icon @click="deleteRowClick" class="text-white cursor-pointer" size="1.5x"></trash-2-icon>
        </li>
      </ul>
    </div>

    <column-selector :name="component.id+'-column-layouts'" :component="component"></column-selector>

    <settings-modal :component="component" customSlotName="Columns">
      <div slot="Columns">
        <em>Debating whether to have column settings here or on each individual col which is how they are currently set up</em>  
      </div>  
    </settings-modal> 

    <div class="row-inner flex mx-0 py-6 px-4 flex-1">
      <template v-for="(component) in dragArray">
        <column-module 
        :id="component.id"
        :columns="columns" 
        :colcount="colcount" 
        @drag-finished="runFunc" 
        :key="component.id" 
        :components="component.content" 
        :component="component"
        :parent_id="selfID"></column-module>  
      </template>
    </div>
        <!-- <plus-circle-icon @click="cloneRow()" class="add-component" size="1.5x"></plus-circle-icon> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { PlusCircleIcon, MenuIcon, Trash2Icon, CopyIcon, XIcon, ColumnsIcon } from 'vue-feather-icons';
import SettingsModal from '../../shared/SettingsModal';
import InlineStyleEditor from '../../../components/shared/InlineStyleEditor';
import ColumnModule from '../ColumnModule';
import ColumnSelector from './ColumnSelector';
import AttributeEditor from '../../shared/AttributeEditor';
import {EventBus} from '../../../eventBus'
  export default { 
    name: 'row-module',
    data: function() {
      return {
        settingsOpen: false,
        dragArray: this.components,
        hovering: false,
      }
    },
    provide() {
        return {
            component: this.component,
            parent_id: this.parent_id,
            row_id: this.component.id
        }
    },
    components: {
      AttributeEditor,
      SettingsModal,
      InlineStyleEditor,
      ColumnModule,
      ColumnSelector,
      PlusCircleIcon,
      MenuIcon,
      Trash2Icon,
      CopyIcon,
      ColumnsIcon
    },
    computed: {
      columns() {
        return this.component.content.length
      },
      selfID() {
        return this.component.id
      } 
    },
    methods: {
      ...mapActions(['cloneRow', 'deleteRow']),
      openRowSettings() {
        this.$modal.show(this.component.id);
      },
      cloneRowClick() {
        this.cloneRow({
          parent_id: this.parent_id, 
          component_id: this.component.id,
        })
      },
      deleteRowClick() {
        this.deleteRow({
          parent_id: this.parent_id, 
          component_id: this.component.id,
        })
      },      
      runFunc(obj) {
        this.$emit('test', obj)
      },         
    },
    props: {
      colcount: Number,
      component: Object,
      components: Array,
      componentType: String,
      parent_id: String,
    },
    created() {
      // console.log(this.component.id);
    }
  }
</script>

<style scoped>
.row {
  transition: all 0.2s;
}

.highlight-row {
  animation-name: colorPulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes colorPulse {
  0% {
    background-color: #e2e8f0;
  }
  50% {
    background-color: #48bb78;
  }
  100% {
    background-color: #e2e8f0;
  }
}
</style>