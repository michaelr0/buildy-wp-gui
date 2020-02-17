<template>
    <modal draggable=".dragHandler" :scrollable="true" :resizable="true" :name="component.id" :height="'auto'" @opened="disableDrag(true)" @closed="modalClosed">
      <div class="bg-gray-700 modal-controls absolute w-full flex">
        <div class="dragHandler cursor-move flex-1">        
            <span class="block text-2xl text-gray-400 pl-6 h-full flex items-center">{{ header ? header : component.options.admin_label }}</span>        
        </div>
        <x-icon @click="$modal.hide(component.id)" class="text-gray-400 cursor-pointer inset-y-0 m-2 right-0" size="1.5x"></x-icon>
      </div>
      <div class="p-0 pt-10 bg-gray-300 text-gray-800">        
        <vue-tabs :id="component.id">
            <vue-tab name="Content" v-if="hasDefaultSlot" :selected="hasDefaultSlot">
                <!-- Custom Content Tab Slot -->
                <slot />
            </vue-tab>
            <vue-tab name="Options" :selected="!hasDefaultSlot">
                <!-- Custom Options Tab Slot -->
                <slot name="options"></slot>

                <!-- Global Options -->
                <attribute-editor label="ID" path="attributes.id"></attribute-editor>
                <attribute-editor label="Class" path="attributes.class" sibblingLink></attribute-editor>
                <toggle-switch label="Internal Link?" :status="component.attributes.in_page_link_enabled" path="attributes.in_page_link_enabled"></toggle-switch>
                <attribute-editor v-if="component.attributes.in_page_link_enabled" label="Internal Link Text" path="attributes.in_page_link_text"></attribute-editor>
                <!-- <inline-style-editor header="Edit Styles:" :componentInfo="componentInfo" /> -->
                <color-picker label="Background Color:" path="inline.backgroundColor" />
                <image-uploader :key="'background-image-' + component.id" label="Background Image:" bgImage></image-uploader>                
            </vue-tab>
            <vue-tab :name="customSlotName" v-if="customSlotName">
                <!-- Custom Content Tab Slot -->
                <slot :name="customSlotName" />
            </vue-tab>
        </vue-tabs>  
        <a @click.prevent="saveAll" class="btn py-2 uppercase text-sm block bg-blue-800 text-white rounded-none w-full text-center font-bold" href="#">Save</a>   
      </div>
    </modal> 
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import VueTabs from './VueTabs';
import VueTab from './VueTab';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';
import InlineStyleEditor from './InlineStyleEditor';
import AttributeEditor from './AttributeEditor';
import ToggleSwitch from './ToggleSwitch';
import { XIcon } from 'vue-feather-icons';
import { EventBus } from '../../eventBus';
export default {  
    components: {
        VueTabs,
        VueTab,
        XIcon,
        InlineStyleEditor,
        AttributeEditor,
        ToggleSwitch,
        ImageUploader,
        ColorPicker
    },
    props: {
        header: String,
        component: Object,
        customSlotName: String
    },
    computed: {
        ...mapGetters(['dragging']),
        hasDefaultSlot() {
            return !!this.$slots.default
        },
        hasCustomSlot() {
            return !!this.$slot.customSlotName
        }
    },
    methods: {
        ...mapActions(['disableDrag']),
        modalClosed() {
            this.disableDrag(false)
            //EventBus.$emit('saveAll');
        },
        saveAll() {
            EventBus.$emit(this.component.id+'-saveAll');
            this.$modal.hide(this.component.id)
        }
    },
    created() {
        //console.log(this.componentInfo)
    }
}
</script>

<style>
    .module-settings {
        @apply mb-4
    }
    .module-settings label {
        font-weight: 500;
        @apply block;
    }
</style>

