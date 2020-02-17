<template>
  <div :id="component.id" class="section global-section bg-gray-400 mb-5 flex flex-wrap" :class="[settingsOpen ? 'highlight-section' : '']">
    <div class="settings-bar section-settings px-2 bg-blue-500 items-stretch">
      <ul class="list-unstyled flex flex-col h-full">
        <li class="flex-1 flex items-center">
          <trash-2-icon @click="deleteSectionClick" class="text-white cursor-pointer" size="1.5x"></trash-2-icon>
        </li>
      </ul>
    </div>
    <div class="flex-1 flex-col">
        <shell-module :component="component" /> 
    </div>
  </div>
</template>
<script>
import ShellModule from '../ShellModule'
import { mapState, mapGetters, mapActions } from 'vuex'
import { Trash2Icon } from 'vue-feather-icons';

  export default { 
    name: 'global-module',
    data: function() {
      return {

      }
    },
    computed: {
      selfID() {
        return this.component.id
      }
    },
    components: {
      ShellModule,
      Trash2Icon
    },
    methods: { 
      ...mapActions(['deleteSection']),
      deleteSectionClick() {
        this.deleteSection(this.component.id)
      },
    },
    props: {
      component: Object,
      componentType: String,
    },
  }
</script>

<style scoped>
.section {
  transition: all 0.2s;
}
.highlight-section {
  animation-name: colorPulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes colorPulse {
  0% {
    background-color: #cbd5e0;
  }
  50% {
    background-color: #4299e1;
  }
  100% {
    background-color: #cbd5e0;
  }
}
</style>