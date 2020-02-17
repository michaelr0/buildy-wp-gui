<template>
    <module-base bgcolor="bg-blue-900 py-0 mb-5">
      <settings-modal :component="component">     
        <attribute-editor label="height" path="inline.height"></attribute-editor>
        <color-picker label="Color" path="inline.color" />
      </settings-modal> 
    </module-base>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ModuleBase from '../components/shared/ModuleBase';
import AttributeEditor from '../components/shared/AttributeEditor';
import ColorPicker from '../components/shared/ColorPicker';
import topLevelComponents from '../mixins/topLevelComponents';
import componentCRUD from '../mixins/componentCRUD';
import SettingsModal from '../components/shared/SettingsModal';

  export default { 
    name: 'hr-module', 
    components: {
      ModuleBase,
      AttributeEditor,
      ColorPicker,
      SettingsModal
    },
    props: {
      component: Object,
      parent_id: String,
    },
    provide() {
        return {
            component: this.component,
            parent_id: this.parent_id ? this.parent_id : null
        }
    },
  }
</script>