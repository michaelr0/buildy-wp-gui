<template>
    <module-base bgcolor="bg-gray-600">

    </module-base>
</template>
<script>
import ModuleBase from '../components/shared/ModuleBase';
import topLevelComponents from '../mixins/topLevelComponents';
import SettingsModal from '../components/shared/SettingsModal';

  export default { 
    name: 'shell-module', 
    components: {
      ModuleBase,
      SettingsModal
    },
    computed: {
      admin_label() {
        if (this.component.options && this.component.options.admin_label) {
          return this.component.options.admin_label
        } else {
          return this.component.type ? this.component.type : 'Placeholder for unknown component'
        }
      }
    },
    props: {
      component: Object,
    },
    mixins: [topLevelComponents]
  }
</script>