<template>
  <div
    :id="component.id"
    class="section bg-gray-400 mb-5 flex flex-wrap"
    :class="[settingsOpen ? 'highlight-section' : '']"
  >
    <module-settings-bar
      :parent_array="parent_array"
      direction="col"
    ></module-settings-bar>

    <settings-modal>
      <toggle-switch
        label="Boxed layout"
        path="options.layout_boxed"
        :status="component.options && component.options.layout_boxed"
      ></toggle-switch>
      <toggle-switch
        label="Inner Container?"
        path="options.inner_container"
        :status="component.options && component.options.inner_container"
      ></toggle-switch>
    </settings-modal>

    <div class="flex-1 flex-col">
      <draggable :list="dragArray" v-bind="dragOptions">
        <transition-group
          name="fadeHeight"
          tag="div"
          class="section-inner p-6 pb-2 flex-col flex-wrap flex-1"
        >
          <template v-for="(row, index) in dragArray">
            <row-module
              v-if="row.type === 'row-module'"
              :class="[
                rowCount > 1 && index !== rowCount - 1 ? 'mb-6' : 'mb-0'
              ]"
              :key="row.id"
              :components="row.content"
              :parent_array="component.content"
              :component="row"
            />
            <module-base
              v-else
              :key="row.id"
              :parent_array="component.content"
              :component="row"
            />
          </template>
        </transition-group>
      </draggable>
      <div class="p-4 pt-0 pb-2 text-center empty-controls flex justify-center">
        <a
          @click.prevent="addRow"
          class="flex w-auto mx-6 items-center justify-center"
          href="#"
          ><plus-circle-icon class="mr-2"></plus-circle-icon> Add empty row</a
        >
        <a
          @click.prevent="addHR"
          class="flex w-auto mx-6 items-center justify-center"
          href="#"
          ><plus-circle-icon class="mr-2"></plus-circle-icon> Add Row
          Separator</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PlusCircleIcon } from "vue-feather-icons";
import draggable from "vuedraggable";
import { Module } from "../../classes/ModuleClass";

export default {
  name: "section-module",
  data: function() {
    return {
      settingsOpen: false,
      dragArray: this.component.content,
      hovering: false,
      dragging: false
    };
  },
  computed: {
    ...mapGetters(["dragDisabled"]),
    dragOptions() {
      return {
        group: "rows",
        ghostClass: "ghost",
        disabled: this.dragDisabled
      };
    },
    rowCount() {
      return this.dragArray.length;
    }
  },
  components: {
    draggable,
    PlusCircleIcon
  },
  methods: {
    openSectionSettings() {
      this.$modal.show(this.component.id);
    },
    addRow() {
      let newObj = new Module();
      let newComponent = newObj.newRow();
      this.component.content.push(newComponent);
    },
    addHR() {
      let newObj = new Module({ type: "hr-module" });
      this.component.content.push(newObj.newModule());
    }
  },
  props: {
    component: Object,
    parent_array: Array
  },
  provide() {
    return {
      component: this.component
    };
  }
};
</script>

<style scoped>
.section {
  transition: all 0.2s;
}

/* For components directly inside sections (HR) */
.component-module {
  @apply mb-5;
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
