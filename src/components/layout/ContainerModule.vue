<template>
  <div class="py-5">
    <draggable :list="dragArray" v-bind="dragOptions">
      <transition-group tag="div" name="fadeHeight">
        <template v-for="component in dragArray">
          <component
            v-if="component.type === 'section-module'"
            :is="component.type"
            :parent_array="pageBuilder"
            :key="component.id"
            :component="component"
          ></component>
          <module-base
            v-else
            :key="component.id"
            :parent_array="pageBuilder"
            :component="component"
          />
        </template>
      </transition-group>
    </draggable>
    <div
      class="p-4 pt-0 flex justify-center items-center text-center empty-controls"
    >
      <a
        @click.prevent="addSection"
        class="flex pr-6 items-center justify-center"
        href="#"
        ><plus-circle-icon class="mr-2"></plus-circle-icon> Add empty section</a
      >
      <a
        @click.prevent="$modal.show('global-selection-selector')"
        class="flex pr-6 items-center justify-center"
        href="#"
        ><plus-circle-icon class="mr-2"></plus-circle-icon> Add global
        section</a
      >
      <a
        @click.prevent="addHR"
        class="flex pr-6 items-center justify-center"
        href="#"
        ><plus-circle-icon class="mr-2"></plus-circle-icon> Add Section
        Separator</a
      >
      <modal name="global-selection-selector" :height="'auto'">
        <x-icon
          @click="$modal.hide('global-selection-selector')"
          class="text-gray-800 cursor-pointer inset-y-0 m-2 absolute right-0"
          size="1.5x"
        ></x-icon>
        <div class="w-full bg-gray-400 px-12 py-6">
          <h2 class="mb-6 text-2xl">Choose Module:</h2>
          <div v-if="globalModules" class="flex">
            <div
              v-for="globalModule in globalModules"
              :key="globalModule.id"
              class="flex items-center mr-4 mb-4"
            >
              <label
                @click="addGlobal(globalModule)"
                :for="globalModule.id"
                class="flex items-center cursor-pointer text-large"
              >
                <span
                  class="p-4 inline-block mr-2 bg-gray-200 rounded border border-grey flex-no-shrink flex items-center justify-center"
                  >{{ globalModule.title.rendered }}</span
                >
              </label>
            </div>
          </div>
        </div>
        <!-- <select v-if="newComponent.menuOpen" @change="addModuleClick(component)" v-model="newComponent.type" class="custom-select custom-select-lg mb-3">
        <option v-for="options in newComponent.options" :key="options.type" :value="options.type">{{ options.name }}</option>
      </select> -->
      </modal>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { EventBus } from "../../EventBus";
import { Module } from "../../classes/ModuleClass";
import { PlusCircleIcon, XIcon } from "vue-feather-icons";
import draggable from "vuedraggable";
export default {
  name: "container-module",
  data: function() {
    return {
      globalModules: [],
      dragArray: this.pageBuilder
    };
  },
  computed: {
    ...mapGetters(["dragDisabled"]),
    dragOptions() {
      return {
        group: "sections",
        ghostClass: "ghost",
        disabled: this.dragDisabled
      };
    }
  },
  components: {
    PlusCircleIcon,
    XIcon,
    draggable
  },
  methods: {
    addSection() {
      let newObj = new Module();
      let newComponent = newObj.newSection();
      this.pageBuilder.push(newComponent);
    },
    addGlobal(payload) {
      let newObj = new Module();
      let newComponent = newObj.newGlobalSection(payload);
      this.pageBuilder.push(newComponent);
    },
    addHR() {
      let newObj = new Module({ type: "hr-module" });
      this.pageBuilder.push(newObj.newModule());
    },
    async getGlobals() {
      if (this.globalAPI) {
        let res = await fetch(this.globalAPI);
        let globals = await res.json();
        this.globalModules = globals;
      }
    }
  },
  mounted() {
    this.getGlobals();
    EventBus.$on("dragToggle", val => {
      this.dragOptions.disabled = val;
    });
  },
  props: {
    pageBuilder: Array,
    globalAPI: String
  }
};
</script>
<style scoped>
.hidden {
  display: none !important;
}

/* For components directly inside Root (HR, global) */
.component-module {
  @apply mb-5;
}
</style>
