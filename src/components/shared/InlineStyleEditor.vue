<template>
    <div class="styles-editor module module-settings">
      <span class="text-xl">Edit Inline Styles:</span>
      <ul v-show='!hidecontrols' class="menu-items list-unstyled flex -mx-2 mb-4">
        <li class="px-2" v-for="style in inlineStyles" :key="style.for" @click="editStyles(style)">{{ style.for }}</li>
      </ul>
      <transition name="fadeHeight">
      <div v-if="styleOpen" class="p-4 bg-gray-200">            
        <span class="style-editor-title"> {{ styleOpen.for }}</span>
        <ul class="list-unstyled flex flex-wrap -mx-2">
          <li class="style-top px-2">
            <label class="block" for="top">top</label>
            <input class="text-gray-800 border-2 p-2" id="top" v-model="styleOpen.values.top" />
          </li>
          <li class="style-bottom px-2">
            <label class="block" for="bottom">bottom</label>
            <input class="text-gray-800 border-2 p-2" id="bottom" v-model="styleOpen.values.bottom" />
          </li>
          <li class="style-left px-2">
            <label class="block" for="left">left</label>
            <input class="text-gray-800 border-2 p-2" id="left" v-model="styleOpen.values.left" />
          </li>
          <li class="style-right px-2">
            <label class="block" for="right">right</label>
            <input class="text-gray-800 border-2 p-2" id="right" v-model="styleOpen.values.right" />
          </li>
        </ul>     
      </div>
      </transition>
    </div>
</template>
<script>
import componentCRUD from '../../mixins/componentCRUD';
import { EventBus } from '../../eventBus';
export default {   
    data: function() {
        return {
          styleOpen: '',
          hidecontrols: false,
          inlineStyles: this.component.inline ? this.component.inline : [
            {
              for: 'padding',
              openMenu: false,
              values: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }
            },
            {
              for: 'margin',
              openMenu: false,
              values: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }
            }
          ],          
        }
    }, 
    mixins: [componentCRUD],
    methods: {
      editStyles(style) {
        if (!style.openMenu) {
          style.openMenu = true;
          this.styleOpen = style;
        } else {
          style.openMenu = false;
          this.styleOpen = ''
          this.updateStoreComponent('inline', this.inlineStyles)
        }
        
      }
    },
    props: {
        header: String
    },
    mounted(){
      EventBus.$on(this.component.id+'-saveAll', () => {
        this.updateStoreComponent('inline', this.inlineStyles)
      })
    }
}
</script>

<style lang="scss">
.style-editor li {
    width: 50%;
    padding: 0 10px;
    margin: 5px 0;
    box-sizing: border-box;
    input {
      max-width: 100%;
    }
}
</style>