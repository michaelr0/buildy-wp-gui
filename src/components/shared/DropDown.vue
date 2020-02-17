<template>
    <div class="attribute-editor module module-settings mt-0 flex items-center">
        <label :for="(component.id + 'dropdown')" class="pr-4 w-24">{{label}}:</label>
        <select @change="handleChange" :name="label" :id="(component.id + 'dropdown')" class="text-gray-800 w-full border-2 p-2">
            <option>Test</option>
        </select>
    </div>
</template>

<script>
import {EventBus} from '../../eventBus';
import componentCRUD from '../../mixins/componentCRUD'
export default {
    props: {
        label: String,
        options: String,
    },
    data() {
        return {
            content: this.component.content.body ? this.component.content.body : ''
        }
    },
    mixins: [componentCRUD],
    methods: {
        handleChange() {
            return
            this.updateStoreComponent({ path: 'content.body', prop: this.content })
        }
    },
}
</script>

<style lang="scss">

</style>