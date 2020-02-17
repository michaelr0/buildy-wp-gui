<template>
  <module-base>
    <settings-modal :component="component">     
      <attribute-editor label="Title" path="content.title"></attribute-editor>
      <attribute-editor label="Width" path="content.width"></attribute-editor>
      <attribute-editor label="Height" path="content.height"></attribute-editor>
      <image-uploader label="Image:"></image-uploader>  
    </settings-modal>    
  </module-base>
</template>
<script>
import ModuleBase from '../components/shared/ModuleBase';
import topLevelComponents from '../mixins/topLevelComponents';
import AttributeEditor from '../components/shared/AttributeEditor';
import SettingsModal from '../components/shared/SettingsModal';
import ImageUploader from '../components/shared/ImageUploader';

  export default { 
    name: 'image-module', 
    components: {
      ModuleBase,
      AttributeEditor,
      SettingsModal,
      ImageUploader,
    },  
    mixins: [topLevelComponents],
  }
</script>