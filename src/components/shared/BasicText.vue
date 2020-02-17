<template>
    <div class="attribute-editor module module-settings mt-0 flex items-center">
        <label :for="(component.id + 'text-input')" class="pr-4 w-24">{{label}}:</label>
        <textarea @change="handleChange" class="text-gray-800 w-full border-2 p-2" v-model="content" placeholder="Enter the content for your component"></textarea>
    </div>
</template>

<script>
import {EventBus} from '../../eventBus';
import componentCRUD from '../../mixins/componentCRUD'
export default {
    props: {
        label: String,
    },
    data() {
        return {
            content: this.component.content.body ? this.component.content.body : ''
        }
    },
    mixins: [componentCRUD],
    methods: {
        handleChange() {
            this.updateStoreComponent({ path: 'content.body', prop: this.content })
        }
    },
}
</script>

<style lang="scss">

</style>