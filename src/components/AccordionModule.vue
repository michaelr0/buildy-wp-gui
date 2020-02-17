<template>
  <module-base>
    <settings-modal :component="component">     
      <attribute-editor label="Title" path="content.title"></attribute-editor>
      <radio-buttons label="H-Level" options="H1,H2,H3,H4,H5" path="content.radio.heading_level" />
      <accordion :items="componentItems"  />
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
import Accordion from './shared/Accordion'

  export default { 
    name: 'accordion-module', 
    data: function() {
      return {
        componentItems: (this.component.content.accordion && this.component.content.accordion.items) || false,
      }
    },
    watch: {
      myItems(newLayout) {
        console.log(newLayout)
      }
    },
    components: {
      ModuleBase,
      SettingsModal,
      RadioButtons,
      AttributeEditor,
      RichText,
      Accordion,
    },  
    mixins: [topLevelComponents],
    methods: {
      setList(list) {
        this.myItems = list;
      }
    },
    mounted() {
      console.log(this.component)
    }
  }
</script>