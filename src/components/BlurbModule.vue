<template>
  <module-base>
    <settings-modal :component="component">     
      <attribute-editor label="Title" path="content.title"></attribute-editor>
      <radio-buttons label="H-Level" options="H1,H2,H3,H4,H5" path="content.radio.heading_level" />
      <image-uploader label="Blurb Image:"></image-uploader>
      <rich-text :media=false />      
      <toggle-switch label="Enable Button" :status="buttonEnabled" 
      @toggle="updateModuleNew({ 
          id: component.id, 
          path: 'content.button.buttonEnabled', 
          prop: !buttonEnabled
        })">
      </toggle-switch>  
      <Button name="button" v-show="buttonEnabled" />
    </settings-modal> 
  </module-base>
</template>
<script>
import { mapActions } from 'vuex'
import ModuleBase from './shared/ModuleBase';
import SettingsModal from './shared/SettingsModal';
import topLevelComponents from '../mixins/topLevelComponents';
import AttributeEditor from './shared/AttributeEditor';
import RadioButtons from './shared/radios/RadioButtons';
import ImageUploader from './shared/ImageUploader';
import RichText from './shared/RichText';
import Button from './shared/Button';
import ToggleSwitch from './shared/ToggleSwitch';


// import {customMediaLibrary} from '../functions/medialibrary';

  export default { 
    name: 'blurb-module', 
    components: {
      ModuleBase,
      SettingsModal,
      AttributeEditor,
      RadioButtons,
      ImageUploader,
      RichText,
      Button,
      ToggleSwitch
    },  
    data: function() {
      return {
        keepInBounds: true,
        type: "blurb-module",
      }
    },
    computed: {
      buttonEnabled() {
        return this.component.content.button && this.component.content.button.buttonEnabled;
      }
    },
    props: {
      hidecontrols: Boolean,
    },
    methods: {
      ...mapActions(['updateModuleNew']),
    },
    // mounted() {
    //   console.log('blurb module', this.component)
    // },
    mixins: [topLevelComponents],
  }
</script>