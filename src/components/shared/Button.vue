<template>
    <div class="cta-button module module-settings mt-0">
        <div class="flex items-center mb-2">
            <p v-if="payload.text" 
            ref="buttonText" 
            class="button-text btn mx-auto rounded border-2" 
            :class="[
                (showBackground) ? `bg-${payload.backgroundColor} border-${payload.backgroundColor}` : '', 
                payload.color ? `text-${payload.color}` : '',
                (payload.outlined && payload.borderColor) ? `border-${payload.borderColor}` : ''
            ]" 
            contenteditable="true" 
            >{{ payload.text }}</p>
        </div>
        <div class="flex items-center mb-2">
            <label :for="(name + '-button-text-' + index)" class="pr-4 label-width flex-shrink-0">Button Text:</label>
            <input :id="(name + '-button-text-' + index)" class="text-gray-800 w-full border-2 p-2" @blur="contentUpdate({path: `content.${name}.text`, prop: 'text'})" v-model="payload.text" />
        </div>
        <div class="flex items-center mb-2">
            <label :for="(name + '-button-url-' + index)" class="pr-4 label-width flex-shrink-0">URL:</label>
            <input :id="(name + '-button-url-' + index)" class="text-gray-800 w-full border-2 p-2" @blur="contentUpdate({path: `content.${name}.url`, prop: 'url'})" v-model="payload.url" />
        </div>
        <div class="flex items-center py-3">
            <label class="pr-4 label-width flex-shrink-0">Colors:</label>
            <div class="flex flex-col items-center justify-center mr-6">
                <label :for="(name + '-button-color-' + index)" class="pb-1">Text</label>
                <select class="w-full p-2" :id="(name + '-button-color-' + index)" @change="contentUpdate({path: `content.${name}.color`, prop: 'color'})" v-model="payload.color">
                    <option v-for="color in colors" :key="component.id + name + '-color-' + color">{{ color }}</option>
                </select>
            </div>
            <div v-if="payload.outlined" class="flex  mr-6 flex-col items-center justify-center">
                <label :for="(name + '-button-borderColor-' + index)" class="pb-1">Border</label>
                <select class="w-full p-2" :id="(name + '-button-borderColor-' + index)" @change="contentUpdate({path: `content.${name}.borderColor`, prop: 'borderColor'})" v-model="payload.borderColor">
                    <option v-for="color in colors" :key="component.id + name + '-border-' + color">{{ color }}</option>
                </select>
            </div>
            <div v-if="(showBackground)" class="flex flex-col items-center justify-center">
                <label :for="(name + '-button-bg-' + index)" class="pb-1">Background</label>
                <select class="w-full p-2" :id="(name + '-button-bg-' + index)" @change="contentUpdate({path: `content.${name}.backgroundColor`, prop: 'backgroundColor'})" v-model="payload.backgroundColor">
                    <option v-for="color in colors" :key="component.id + name + '-bg-' + color">{{ color }}</option>
                </select>
            </div>
        </div>
        <toggle-switch label="Outlined" class="mt-6" :status="payload.outlined" @toggle="handleToggle({path: `content.${name}.outlined`, prop: 'outlined'}, $event)"></toggle-switch>  
        <toggle-switch v-if="payload.outlined" label="Show Background" class="mt-6" :status="payload.showBackground" @toggle="handleToggle({path: `content.${name}.showBackground`, prop: 'showBackground'}, $event)"></toggle-switch>  
        <toggle-switch label="Open in new window?" class="mt-2" :status="payload.target" @toggle="handleToggle({path: `content.${name}.target`, prop: 'target'}, $event)"></toggle-switch>  
    </div>
</template>

<script>
import componentCRUD from '../../mixins/componentCRUD';
import ToggleSwitch from './ToggleSwitch';
export default {
    name: 'cta-button',
    components: {
        ToggleSwitch
    },
    mixins: [componentCRUD],
    computed: {
        isOutlined() {
            return this.component[this.name] && this.component[this.name].outlined ? this.component[this.name].outlined : false
        }
    },
    data: function() {
        return {
            payload: {
                text: '',
                url: '',
                color: 'white',
                borderColor: 'white',
                backgroundColor: 'blue',
                target: false,
                outlined: false,
                showBackground: false,
            },
            colors: [
                "red", 
                "blue", 
                "pink",
                "orange",
                'cyan',
                'lightgray',
                'gray',
                'white',
                'black',
            ]
        }
    },    
    computed: {
        componentExists() {
            return this.component.content[this.name]
        },
        showBackground() {
            if (this.payload.showBackground) {
                return true
            }
            if (!this.payload.outlined) {
                return true
            }
            return false
        }
    },
    props: {
        name: {
            type: String,
            default: 'button'
        },
        enabled: {
            type: Boolean,
            default: true
        },
        attribute: String,
        index: {
            type: Number,
            default: 0
        }
    },  
    methods: {
        handleToggle(options, event) {
            this.payload[options.prop] = event
            this.updateStoreComponent({ path: options.path, prop: event})
        },
        contentUpdate(options) {
            if (options) {
                this.updateStoreComponent({ path: options.path, prop: this.payload[options.prop] })
            }
        },
    },
    created() {
        console.log('column ID', this.column_index)
        Object.keys(this.payload).forEach(key => {
            if (this.componentExists && this.component.content[this.name][key]) {
                key === '' ? '' : key
                this.$set(this.payload, key, this.component.content[this.name][key]);
            }
        })
    }
}
</script>

<style scoped>
    .btn {
        border-color: inherit;
    }
    .button-text:not(.btn-link) {
        color: white;
    }
    select.w-full {
        max-width: none;
    }
</style>