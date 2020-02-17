<template>
  <module-base>
    <settings-modal :component="component">     
      <Button name="cta" />
    </settings-modal> 
  </module-base>
</template>
<script>
import ModuleBase from '../components/shared/ModuleBase';
import topLevelComponents from '../mixins/topLevelComponents';
import SettingsModal from '../components/shared/SettingsModal';
import AttributeEditor from '../components/shared/AttributeEditor';
import Button from '../components/shared/Button';

  export default { 
    name: 'button-module', 
    components: {
      ModuleBase,
      SettingsModal,
      AttributeEditor,
      Button
    },  
    mixins: [topLevelComponents]
  }
</script>