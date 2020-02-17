<template>
    <div class="settings-bar rounded rounded-r-none rounded-b-none module">
      <ul class="list-unstyled flex py-1">
        <li class="flex px-3 items-center m-0">
          <menu-icon @click="$modal.show(component.id)" class="text-white cursor-pointer" size="1.5x"></menu-icon>
        </li>
        <li class="flex px-3 items-center m-0">
          <copy-icon @click="cloneStoreComponent" class="text-white cursor-pointer" size="1.5x"></copy-icon>
        </li>
        <li class="flex px-3 items-center m-0">
          <trash-2-icon @click="deleteStoreComponent" class="text-white cursor-pointer" size="1.5x"></trash-2-icon>
        </li>
      </ul>
    </div>
</template>

<script>
import { MenuIcon, XIcon, PlusCircleIcon, Trash2Icon, CopyIcon } from 'vue-feather-icons';
import componentMixin from '../../mixins/componentCRUD';
export default {
    components: {
        MenuIcon,
        PlusCircleIcon,
        Trash2Icon, 
        CopyIcon
    },
    mixins: [componentMixin],
}
</script>

