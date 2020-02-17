<template>
    <div class="attribute-editor module module-settings mt-0 flex items-center">
        <label class="pr-4 label-width">{{label}}:</label>
        <div class="radio-buttons w-full">
            <div v-for="(option, i) in optionsArr" :key="option+i" class="radio-button">
                <input :key="`${option+i}_selection_${selection}`" @change="handleChange" type="radio" :id="(component.id + 'dropdown-' + i)" v-model="selection" :value="option">
                <label :for="(component.id + 'dropdown-' + i)"><span>{{ option }}</span></label>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../../../eventBus';
import { getDeep } from '../../../functions/objectHelpers'
import componentCRUD from '../../../mixins/componentCRUD'
export default {
    props: {
        label: String,
        options: String,
        attribute: String,
        path: String,
    },
    data() {
        return {
            selection: ''
        }
    },
    computed: {
        optionsArr() {
            return this.options.split(',')
        }
    },
    mixins: [componentCRUD],
    methods: {
        handleChange() {
            this.updateStoreComponent({ path: this.path, prop: this.selection })
        }
    },
    mounted() {
      this.selection = getDeep(this.component, this.path) || ''
    }
}
</script>

<style lang="scss" scoped>

  .radio-button {
    display: inline-block;
  }

  input[type="radio"] {
    display: none;

    + label {
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 14px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin: 0 0.5rem 0 0;
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid #FFFFFF;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        line-height: 44px;
      }
      &:hover span {
        background: #e2e8f0;
      }
    }
    &:checked + label span {
      background: darken(#e2e8f0, 15%);
    }
  }
</style>