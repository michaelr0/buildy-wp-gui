<template>
  <module-base>
    <settings-modal :component="component">     
      <attribute-editor label="Title" path="content.title"></attribute-editor>
      <radio-buttons label="H-Level" options="H1,H2,H3,H4,H5" path="content.radio.heading_level" />
      <rich-text header="Edit Content:" />
    </settings-modal> 
  </module-base>
</template>
<script>
import ModuleBase from './shared/ModuleBase';
import topLevelComponents from '../mixins/topLevelComponents';
import SettingsModal from './shared/SettingsModal';
import RadioButtons from './shared/radios/RadioButtons';
import AttributeEditor from './shared/AttributeEditor';
import RichText from './shared/RichText';

  export default { 
    name: 'text-module', 
    components: {
      ModuleBase,
      SettingsModal,
      RadioButtons,
      AttributeEditor,
      RichText,
    },  
    mixins: [topLevelComponents],
  }
</script>