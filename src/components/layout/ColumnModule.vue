<template>
  <div @mouseover="hovering = true" @mouseleave="hovering = false" class="col px-4 pb-2 flex-col text-center" :class="[columnClasses,moduleCount ? 'hasItems' : 'empty']">     

    <settings-modal :component="component" customSlotName="Column Breakpoints">
      <div slot="Column Breakpoints" v-for="(number, size) in breakpoints" :key="component.id + size">
        <div class="mt-0 flex items-center">
          <label class="pr-4 w-24">{{ `col-${size}` }}:</label>
          <input :id="(component.id + size + number)" class="text-gray-800 w-full border-2 p-2" :value="number" @blur="UPDATE_BREAKPOINT_ATT({parent_id: component.id, rootpath: 'options', subpath: 'columns', size, val: $event.target.value})" />
        </div>
      </div>  
    </settings-modal> 

    <div class="relative flex-1 h-full">
      
      <draggable class="w-full" :list="dragArray" v-bind="dragOptions">
        <transition-group name="fadeHeight" tag="div" class="col-inner flex-1">
          <template v-for="(component, index) in dragArray">
            <component 
            :class="[(moduleCount > 1) && index !== (moduleCount -1) ? 'mb-2' : 'mb-0']" 
            :parent_id="selfID"  
            :component="component"
            :is="componentMap(component.type)" 
            :key="component.id" 
            :content="component.content"></component>  
          </template>   
        </transition-group>    
      </draggable>


      <transition name="fade">
        <div v-show="hovering || !moduleCount"  class="col-options w-full absolute flex p-1 bg-gray-200 text-dark flex-1">
          
          <div class="absolute left-1">
            <chevron-left-icon @click.prevent="decrementCol({component_id: component.id, size: curBreakpoint})" class="cursor-pointer" size="1.5x"></chevron-left-icon>
          </div>
          <div class="flex flex-1 justify-center text-center items-center flex-1">
              <menu-icon @click="$modal.show(component.id)" class="cursor-pointer mr-2" size="1.5x"></menu-icon>
              <a @click.prevent="openModal" href="#"><plus-circle-icon v-show="showAddIcon" class="add-component w-full cursor-pointer mr-1"  size="1.5x"></plus-circle-icon></a>
          </div>
          <div class="absolute pos-right">
            <chevron-right-icon @click.prevent="incrementCol({component_id: component.id, size: curBreakpoint})" class="cursor-pointer" size="1.5x"></chevron-right-icon>
          </div>          
        </div>     
      </transition>  

    </div>

    <modal :name="'column-'+component.id" :height="'auto'" @opened="disableDrag(true)" @closed="disableDrag(false)">
      <x-icon @click="closeModal" class="text-gray-800 cursor-pointer inset-y-0 m-2 absolute right-0" size="1.5x"></x-icon>
      <div class="w-full bg-gray-400 px-12 py-6">
        <h2 class="mb-6 text-2xl">Choose Module: </h2>            
        <div class="flex flex-wrap">            
          <div v-for="options in newComponent.options" :key="options.type" class="flex items-center mr-4 mb-4">
            <input :id="options.type" @change="addModuleClick(options)" :value="options.type" type="radio" class="hidden" />
            <label :for="options.type" class="flex items-center cursor-pointer text-lg">
            <span class="w-24 h-24 inline-block mr-2 bg-gray-200 rounded border border-grey flex-no-shrink flex flex-col items-center justify-center">
              <component :is="options.icon"></component>
              {{ options.name }}
              </span>
            </label>
          </div>
        </div>
        </div>
    <!-- <select v-if="newComponent.menuOpen" @change="addModuleClick(component)" v-model="newComponent.type" class="custom-select custom-select-lg mb-3">
      <option v-for="options in newComponent.options" :key="options.type" :value="options.type">{{ options.name }}</option>
    </select> -->
    </modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { 
  MenuIcon, 
  MinusIcon, 
  PlusCircleIcon, 
  Trash2Icon, 
  CopyIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XIcon, 
  AlignJustifyIcon, 
  CoffeeIcon, 
  ListIcon, 
  PlayCircleIcon,
  ImageIcon, 
  CodeIcon } from 'vue-feather-icons';

import debounce from '../../functions/helpers'

import {Module} from '../../classes/ModuleClass'
import SettingsModal from '../shared/SettingsModal';
import ShellModule from '../ShellModule';
import TextModule from '../TextModule';
import AccordionModule from '../AccordionModule';
import ButtonModule from '../ButtonModule';
import HeadingModule from '../HeadingModule';
import HRModule from '../HRModule';
import ImageModule from '../ImageModule';
import BlurbModule from '../BlurbModule';
import VideoModule from '../VideoModule';
import CodeModule from '../CodeModule';
import draggable from 'vuedraggable';

export default { 
    name: 'column-module',
    components: {
      draggable,
      ShellModule,
      SettingsModal,
      TextModule,
      AccordionModule,
      ButtonModule,
      HeadingModule,
      "hr-module": HRModule,
      ImageModule,
      BlurbModule,
      VideoModule,
      CodeModule,
      MenuIcon,
      MinusIcon,
      PlusCircleIcon,
      Trash2Icon, 
      CopyIcon,
      ChevronLeftIcon,
      ChevronRightIcon,
      XIcon,
      AlignJustifyIcon,
      CoffeeIcon,
      ListIcon,
      PlayCircleIcon,
      ImageIcon,
      CodeIcon
    },
    data: function() {
      return {
        dragArray: this.components,
        hovering: false,
        bootcols: '',
        windowWidth: Number,
        breakpoints: this.component.options.columns,
        newComponent: {
          menuOpen: false,
          options: [
            {
              name: 'Text',
              icon: 'AlignJustifyIcon',
              type: 'text-module'
            },
            {
              name: 'Header',
              icon: 'AlignJustifyIcon',
              type: 'heading-module'
            },
            {
              name: 'Image',
              icon: 'ImageIcon',
              type: 'image-module'
            },
            {
              name: 'Blurb',
              icon: 'CoffeeIcon',
              type: 'blurb-module',
              atts: [
                {
                  path: 'content.button',
                  props: {
                    buttonEnabled: false
                  }
                },
              ]
            },
            {
              name: 'Accordion',
              icon: 'ListIcon',
              type: 'accordion-module',
              atts: [
                {
                  path: 'content.accordion',
                  props: {
                    items: [
                      {
                        title: 'Accordion Title',
                        body: 'Accordion Body',
                      }
                    ]
                  }
                },
              ]
            },
            {
              name: 'Video',
              icon: 'PlayCircleIcon',
              type: 'video-module',
              atts: [
                {
                  path: 'content.youtube',
                  props: {
                    video_url: '',
                    video_width: '100%',
                    video_height: '400',
                    allow_params: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                    allow_fullscreen: true,
                    directEmbed: false,
                  }
                },
              ]
            },
            {
              name: 'Button',
              icon: 'PlusCircleIcon',
              type: 'button-module',
            },
            {
              name: 'Code',
              icon: 'CodeIcon',
              type: 'code-module'
            },
            {
              name: 'HR',
              icon: 'MinusIcon',
              type: 'hr-module'
            }
          ],
          type: ''
        }
      }
    },
    computed: {
      ...mapGetters(['dragging']),
      selfID() {
        return this.component.id
      },
      dragOptions() {
        return {
          group: "components",
          ghostClass: "ghost",
          disabled: this.dragging
        }
      },
      curBreakpoint() {
        if (this.windowWidth < 480) {
          return "xs"
        } else if (this.windowWidth >= 480 && this.windowWidth < 768) {
          return "sm"
        } else if (this.windowWidth >= 768 && this.windowWidth < 980) {
          return 'md'
        } else if (this.windowWidth >= 980 && this.windowWidth < 1170) {
          return 'lg'
        } else {
          return 'xl'
        }
      },
      moduleCount() {
        return this.dragArray.length;
      },
      showAddIcon() {
        return (!this.newComponent.menuOpen && this.hovering) || (!this.emptyCheck && !this.newComponent.menuOpen)
      },      
      columnClasses() {
        const breakpoints = this.component.options.columns
        const col = parseInt(this.component.options.columns.md)    
        const classes = []   

        for(let breakpoint in breakpoints) {
          if (breakpoints[breakpoint]) {
            classes.push(`col-${breakpoint}-${String(breakpoints[breakpoint])}`)
          }
        }
        
        return classes.join(' ')
      }      
    },
    methods: {
      ...mapActions(['decrementCol', 'incrementCol', 'addModule', 'disableDrag', 'updateModule', 'UPDATE_BREAKPOINT_ATT']),
      openModal() {
        this.$modal.show('column-'+this.component.id)
      },
      closeModal() {    
        this.$modal.hide('column-'+this.component.id);
      },
      async addModuleClick(options) {
        const type = options.type
        let newObj = new Module(options)

        let newComponent;

        if (!options.atts) {
          newComponent = newObj.newModule();
        } else {
          newComponent = newObj.customAtts(options.atts)
        }

        this.addModule({
          parent_id: this.component.id,
          module: newComponent
        });

        this.closeModal();
        this.newComponent.menuOpen = false;
      },
      componentMap(el) {
        let components = Object.values(this.$options.components).map(a => a.name)
        if (components.includes(el)) {
          return el
        } else {
          return 'shell-module'
        }
      },
    },
    props: {
      colcount: Number,
      columns: Number,
      component: Object,
      components: Array,
      parent_id: String,      
    },
    provide() {
        return {
            component: this.component,
            parent_id: this.parent_id
        }
    },    
    mounted() {
      this.$nextTick(() => {

        const vm = this
        vm.windowWidth = window.outerWidth

        window.addEventListener('resize', debounce(function(e) {
          vm.windowWidth = e.target.outerWidth
        }, 100))
      })
    },
    beforeDestroy(){
      window.removeEventListener('resize', debounce(function(e) {
          vm.windowWidth = e.target.outerWidth
        }, 100))
    },
  }
</script>

<style lang="scss" scoped>
.col-inner {
  min-height: 48px;
}
.col.empty .relative {
  @apply rounded rounded-l-none items-center p-0 content-center justify-center flex bg-gray-200 border-2 border-dashed flex-1 border-gray-600;
  .add-component {
    @apply text-gray-800;
  }
}
.col > div div:last-of-type .col-inner > div {
  @apply mb-0;
}

.col .col-options {
  @apply z-20
}

.col.empty .col-options {
  @apply z-10
}

.pos-right {
  right: 0;
}

input[type="radio"] + label span {
    transition: background .2s,
      transform .2s;
}

.hidden {
  display: none !important;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span{
  transform: scale(1.04);
} 

input[type="radio"]:checked + label span {
  background-color: #3490DC; //bg-blue
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type="radio"]:checked + label{
   color: #3490DC; //text-blue
}
</style>