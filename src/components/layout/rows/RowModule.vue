<template>
  <div
    :id="component.id"
    class="bg-gray-300 mx-0 flex flex-wrap"
    :class="[settingsOpen ? 'highlight-row' : '']"
  >
    <module-settings-bar
      :parent_array="parent_array"
      direction="col"
      :customSettings="customSettings"
    >
    </module-settings-bar>

    <column-selector
      :parent_array="component.content"
      :name="component.id + '-column-layouts'"
      :component="component"
    ></column-selector>

    <settings-modal :customSlots="['grid']">
      <fieldset slot="grid">
        <legend class="mb-4 italic text-center">
          Grid will use the same column count &amp; style
        </legend>
        <toggle-switch label="Enable css grid?" path="inline.cssGrid.enabled" />
        <attribute-editor
          placeholder="Choose the distance between columns (1-10)"
          label="Gap"
          path="inline.cssGrid.gap"
        />
      </fieldset>
    </settings-modal>

    <div class="row-inner flex mx-0 py-6 px-4 flex-1">
      <column-module
        v-for="component in dragArray"
        :id="component.id"
        :columns="columns"
        :key="component.id"
        :component="component"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "row-module",
  data: function() {
    return {
      settingsOpen: false,
      dragArray: this.components,
      dragging: this.dragDisabled,
      customSettings: [
        {
          name: "Column Selector",
          icon: "ColumnsIcon",
          action: this.openColumnSelector,
          order: 11
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["dragDisabled"]),
    columns() {
      return this.component.content.length;
    },
    selfID() {
      return this.component.id;
    }
  },
  methods: {
    openRowSettings() {
      this.$modal.show(this.component.id);
    },
    openColumnSelector() {
      this.$modal.show(this.component.id + "-column-layouts");
    }
  },
  props: {
    component: Object,
    components: Array,
    parent_array: Array
  },
  provide() {
    return {
      component: this.component,
      parent: this.parent
    };
  }
};
</script>

<style scoped>
.row {
  transition: all 0.2s;
}

.highlight-row {
  animation-name: colorPulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes colorPulse {
  0% {
    background-color: #e2e8f0;
  }
  50% {
    background-color: #48bb78;
  }
  100% {
    background-color: #e2e8f0;
  }
}
</style>
