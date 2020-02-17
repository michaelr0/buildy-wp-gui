<template>
    <div class="attribute-editor module module-settings mt-0 flex flex-col">
      <div class="flex items-center">
        <label :for="(component.id + attribute)" class="pr-4 label-width">{{ _label }}:</label>
        <input :id="(component.id + attribute)" @change="handleChange" class="text-gray-800 w-full border-2 p-2" :placeholder="label" v-model="attributeData" />
      </div>
      <a class="text-gray-800 self-end py-2" v-if="sibblingLink" @click.prevent="sibbling_link({ path: path, prop: attribute, row_id, data: attributeData})" href="#">Apply {{ label }} to siblings</a>
    </div>
</template>

<script>
import componentCRUD from '../../mixins/componentCRUD';
import { mapActions } from 'vuex';
import { getDeep } from '../../functions/objectHelpers';
import { EventBus } from '../../eventBus';
export default {   
  name: 'attribute-editor',
    data: function() {
        return {
            attributeData: '',
            legacy: true
        }
    }, 
    computed: {
      _label() {
        return this.label || this.attribute.charAt(0).toUpperCase() + this.attribute.slice(1)
      }
    },
    methods: {
      ...mapActions(['sibbling_link']),
      handleChange() {
        if (this.path.includes('.')) {
          this.updateStoreComponent({ path: this.path, prop: this.attributeData })
        } else {
          this.updateStoreComponent({ path: this.path, prop: this.attribute}, this.attributeData)
        }
        this.$emit('attributeChange', this.attributeData)
      }
    },
    mixins: [componentCRUD],
    props: {
      sibblingLink: {
        type: Boolean,
        default: false
      },
      label: String,
      attribute: String,
      path: String,
    },
    inject: ["row_id"],
    mounted(){
      if (this.path && this.path.includes('.')) {
        this.legacy = false
      }

      if (!this.legacy) {
        this.attributeData = getDeep(this.component, this.path) || ''
      } else {
        this.attributeData = this.component[this.path][this.attribute] || ''
      }

      EventBus.$on(this.component.id+'-saveAll', () => {
        if (!this.legacy) {
          this.updateStoreComponent({ path: this.path, prop: this.attributeData })
        } else {
          this.updateStoreComponent({ path: this.path, prop: this.attribute}, this.attributeData)
        }
      })
    }
}
</script>
