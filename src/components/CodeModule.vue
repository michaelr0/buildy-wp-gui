<template>
  <module-base>
    <settings-modal :component="component">     
      <attribute-editor label="Title" path="content.title"></attribute-editor>
      <code-editor header="Edit Content:" />
    </settings-modal> 
  </module-base>
</template>
<script>
import ModuleBase from '../components/shared/ModuleBase';
import SettingsModal from '../components/shared/SettingsModal';
import topLevelComponents from '../mixins/topLevelComponents';
import AttributeEditor from '../components/shared/AttributeEditor';
import CodeEditor from '../components/shared/CodeEditor';

  export default { 
    name: 'code-module', 
    components: {
      ModuleBase,
      SettingsModal,
      AttributeEditor,
      CodeEditor,
    },  
    mixins: [topLevelComponents],
  }
</script>