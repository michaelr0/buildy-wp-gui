<template>
    <div class="module module-settings">
      <span v-if="header" class="text-2xl block mb-4" v-text="header" />     
      <textarea class="w-full h-24 p-4" v-model="editorData" @input="contentUpdate"></textarea>
    </div>
</template>
<script>
// @ts-ignore
import componentCRUD from '../../mixins/componentCRUD';
import {EventBus} from '../../eventBus'

export default {
    components: {
    },    
    data: function() {
        return {
            editClassOpen: false,
            keepInBounds: true,
            editorData: this.component.content.body ? this.component.content.body : '',
        }
    }, 
    mixins: [componentCRUD],
    props: {
        header: String
    },
    methods: {
      contentUpdate() {
        this.updateStoreComponent({ path: 'content.body', prop: this.editorData })
      },
      cleanUp() {
        //this.editor.destroy()
      }
    },
    created() {
    }
}
</script>

<style lang="scss">

</style>

