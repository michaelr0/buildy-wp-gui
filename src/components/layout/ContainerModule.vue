<template>
  <div class="py-5">
    <textarea class="mt-1 mb-4 hidden none" name="BMCB_PageBuilder" style="width:100%; height: 200px;" v-model="finalOutput"></textarea>
    <draggable :list="dragArray" v-bind="dragOptions">
      <transition-group tag="div" name="fadeHeight">
        <template v-for="(component, index) in dragArray">
          <component :is="component.type" :key="component.id" :components="component.content" :section_index="index" :component="component"></component>
        </template>
      </transition-group>
    </draggable>
    <div class="p-4 pt-0 flex justify-center items-center text-center empty-controls">
      <a @click.prevent="addSection" class="flex pr-6 items-center justify-center" href="#"><plus-circle-icon class="mr-2"></plus-circle-icon> Add empty section</a>  
      <a @click.prevent="$modal.show('global-selection-selector')" class="flex pr-6 items-center justify-center" href="#"><plus-circle-icon class="mr-2"></plus-circle-icon> Add global section</a>  
      <a @click.prevent="addHR" class="flex pr-6 items-center justify-center" href="#"><plus-circle-icon class="mr-2"></plus-circle-icon> Add HR</a>  
      <modal name="global-selection-selector" :height="'auto'" @opened="disableDrag(true)" @closed="disableDrag(false)">
        <x-icon @click="$modal.hide('global-selection-selector')" class="text-gray-800 cursor-pointer inset-y-0 m-2 absolute right-0" size="1.5x"></x-icon>
        <div class="w-full bg-gray-400 px-12 py-6">
          <h2 class="mb-6 text-2xl">Choose Module:</h2>            
          <div v-if="globalModuls" class="flex">           
            <div v-for="globalModul in globalModuls" :key="globalModul.id" class="flex items-center mr-4 mb-4">
              <label @click="addGlobalSectionHandler(globalModul)" :for="globalModul.id" class="flex items-center cursor-pointer text-large">
                <span class="w-24 h-24 inline-block mr-2 bg-gray-200 rounded border border-grey flex-no-shrink flex items-center justify-center">{{ globalModul.title.rendered }}</span>
              </label>
            </div>
          </div>
          </div>
      <!-- <select v-if="newComponent.menuOpen" @change="addModuleClick(component)" v-model="newComponent.type" class="custom-select custom-select-lg mb-3">
        <option v-for="options in newComponent.options" :key="options.type" :value="options.type">{{ options.name }}</option>
      </select> -->
      </modal>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SectionModule from '../layout/SectionModule';
import GlobalModule from '../layout/GlobalModule';
import HRModule from '../HRModule';
import { PlusCircleIcon, XIcon } from 'vue-feather-icons';
import draggable from 'vuedraggable';
  export default {
    name: 'container-module',
    data: function() {
      return {
        globalModuls: [],
        selectedGlobal: 'Add Global',
      }
    },
    computed: {
      ...mapGetters(['finalOutput', 'dragging', 'global_api']),
      dragArray() {
        return this.components
      },
      dragOptions() {
        return {
          group: "sections",
          ghostClass: "ghost",
          disabled: this.dragging
        }
      }
    },
    components: {
      SectionModule,
      GlobalModule,
      "hr-module": HRModule,
      PlusCircleIcon,
      XIcon,
      draggable
    },
    props: {
      components: Array,
      componentType: String,
    },
    methods: {
      ...mapActions(['addSection', 'addGlobalSection', 'disableDrag', 'addHR']),
      fetchGlobals() {        
        fetch(this.global_api)
          .then(res => res.json())
          .then(data => this.globalModuls = data)
          .catch(err => console.log(err))
      },
      addGlobalSectionHandler(globalModul) {
       this.addGlobalSection(globalModul);
       this.$modal.hide('global-selection-selector')
      }
    },
    mounted() {
      this.fetchGlobals();
    }
  }
</script>
<style scoped>
.hidden {
  display: none !important;
}
</style>
