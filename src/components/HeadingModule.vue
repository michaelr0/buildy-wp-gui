<template>
  <module-base>
    <settings-modal :component="component">     
      <basic-text label="Heading" />
      <radio-buttons label="H-Level" options="H1,H2,H3,H4,H5" path="content.radio.heading_level" />
    </settings-modal> 
  </module-base>
</template>
<script>
import ModuleBase from '../components/shared/ModuleBase';
import topLevelComponents from '../mixins/topLevelComponents';
import SettingsModal from '../components/shared/SettingsModal';
// import AttributeEditor from '../components/shared/AttributeEditor';
import BasicText from '../components/shared/BasicText';
import RadioButtons from '../components/shared/radios/RadioButtons';

  export default { 
    name: 'heading-module', 
    components: {
      ModuleBase,
      SettingsModal,
      // AttributeEditor,
      BasicText,
      RadioButtons
    },  
    mixins: [topLevelComponents],
  }
</script>