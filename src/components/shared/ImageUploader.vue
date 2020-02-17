<template>
    <div class="image-uploader module module-settings">
        <label class="pb-2" v-if="label" v-text="label" />       
        <div @click.prevent="openMediaLibrary" class="flex w-full relative cursor-pointer items-center justify-center image-selector" :class="[imageSrc ? 'hasImage' : 'empty' ]"> 
            <img v-if="imageSrc" :id="'img-'+component.id" class="image-preview" :src="imageSrc" />            
            <trash-2-icon v-if="imageSrc" @click.stop="removeImage" class="text-white absolute delete-image-icon cursor-pointer" size="1.5x"></trash-2-icon>
            <span v-if="!imageSrc">Upload Image</span>
        </div> 
    </div> 
</template>

<script>
import { MenuIcon, XIcon, PlusCircleIcon, Trash2Icon, CopyIcon } from 'vue-feather-icons';
import componentCRUD from '../../mixins/componentCRUD';
import mediaLibrary from '../../mixins/mediaLibrary';
export default {
    computed: {
        imageSrc() {
            if (this.bgImage) {
                return this.component.inline.background_image ? this.component.inline.background_image : false;
            } else {
                return this.component.content.image ? this.component.content.image : false;           
            }   
        }
    },
    mixins: [componentCRUD, mediaLibrary],
    methods: {      
        removeImage() {
            if (this.bgImage) {
                   this.updateStoreComponent({path: 'inline.background_image', prop: ''})
            } else {
                this.updateStoreComponent({path: 'content.image', prop: ''})
            }   
        }    
    },
    props: {
        bgImage: Boolean,
        label: String
    },
    components: {
        Trash2Icon
    },
    mounted() {
        if (this.customMediaLibrary) {
            this.customMediaLibrary.on('select', () => {
                var selectedImages = this.customMediaLibrary.state().get( 'selection' );
                selectedImages.map( ( attachment ) => {
                    attachment = attachment.toJSON();
                    if (this.bgImage) {
                        this.updateStoreComponent({path: 'inline.background_image', prop: attachment.url})
                    } else {
                        this.updateStoreComponent({path: 'content.image', prop: attachment.url})
                    }
                });
            })
        }
    }
}
</script>

<style>
.image-selector.empty {
    @apply bg-gray-300 h-12 border-2 border-dashed border-gray-600;
    transition: background-color 0.2s;
}

.image-selector.empty:hover {
    @apply bg-gray-200;
}

.image-preview {
    @apply w-full object-cover h-40;
}

.delete-image-icon {
    top: 3px;
    right: 3px;
    background: #00000069;
    padding: 6px;
    height: auto;
    width: 30px;    
    opacity: 0;
    transition: opacity 0.2s;
}

.image-selector:hover .delete-image-icon {
    opacity: 1;
}

</style>

