<template>
    <div class="module module-settings">
      <span class="text-2xl block mb-4" v-if="header" v-text="header" /> 
      <a v-if="customMediaLibrary" class="btn border-b-2 border-gray-500 mb-2" @click.prevent="openMediaLibrary" href="#">Media Library</a>
      <vue-editor class="bg-gray-200" ref="editorEl" v-model="editorData" @selection-change="updateCursorLocation" @text-change="contentUpdate" :editorToolbar="customToolbar"></vue-editor>
    </div>
</template>
<script>
// @ts-ignore

import { mapState, mapGetters, mapActions } from 'vuex';
import { VueEditor } from "vue2-editor";
import componentCRUD from '../../mixins/componentCRUD';
import mediaLibrary from '../../mixins/mediaLibrary';
import {EventBus} from '../../eventBus'

export default {
    components: {
        VueEditor
    },    
    data: function() {
        return {
          cursorLocation: Number,
          editClassOpen: false,
          keepInBounds: true,
          editorData: this.component.content.body ? this.component.content.body : '',
          isWordpress: window.wp,
          customToolbar: [[{ 'header': [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline"], [{ size: [ 'small', false, 'large', 'huge' ]}], [{ list: "ordered" }, { list: "bullet" }], ['link']],
        }
    }, 
    computed: {
      ...mapState(['adminURL']),
      editor() {
        return this.$refs.editorEl.quill
      }
    },
    mixins: [componentCRUD, mediaLibrary],
    props: {
        header: String,
        media: {
          type: Boolean,
          default: true
        }
    },
    methods: {
      updateCursorLocation(e) {
        if (!e) {
          return
        }
        const {index, length} = e
        if (index.length) {
          this.cursorLocation = index
        }        
      },
      contentUpdate() {
        this.updateStoreComponent({ path: 'content.body', prop: this.editorData })
      },
    },
    mounted() {
      if (this.customMediaLibrary) {
        this.customMediaLibrary.on('select', () => {
            var selectedImages = this.customMediaLibrary.state().get( 'selection' );
            selectedImages.map( ( attachment ) => {
                attachment = attachment.toJSON();
                this.editor.insertEmbed(this.cursorLocation, "image", attachment.url);
                //this.updateStoreComponent('imageSrc', attachment.url)
            });
        })
      }

      EventBus.$on(this.component.id+'-saveAll', () => {
        this.updateStoreComponent({ path: 'content.body', prop: this.editorData })
      })
    },
}
</script>

<style lang="scss">
.editor__content {
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#buildy-root .ql-editor p {
	margin-bottom: 15px;
}


</style>

