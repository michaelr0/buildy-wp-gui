<template>
  <module-base>
    <settings-modal :component="component">     
      <attribute-editor path="content" attribute="title"></attribute-editor>
      <radio-buttons label="H-Level" options="H1,H2,H3,H4,H5" path="content.radio.heading_level" />
      <div v-if="imageSrc" class="flex w-full pb-6 pl-32 pt-2 relative cursor-pointer items-center justify-center image-selector" :class="[imageSrc ? 'hasImage' : 'empty' ]"> 
          <img :id="'img-'+component.id" class="image-preview pl-4 object-cover" :src="imageSrc" />            
      </div> 
      <attribute-editor path="content.youtube.video_url" label="Video Url" @attributeChange="getThumb"></attribute-editor>
      <attribute-editor path="content.youtube.video_width" label="Video Width"></attribute-editor>
      <attribute-editor path="content.youtube.video_height" label="Video Height"></attribute-editor>
      <attribute-editor path="content.youtube.allow_params" label="Allow Params"></attribute-editor>
      <!-- <toggle-switch 
        label="Direct Embed?" 
        :status="component.content.directEmbed" 
        @toggle="updateModule({ 
            id: component.id, 
            type: { path: 'content', prop: 'directEmbed'},
            content: !component.content.directEmbed
          })">
      </toggle-switch> 
      <div v-if="component.content.directEmbed" class="direct_embed_controls">
        <attribute-editor path="content.directEmbed.url" label="Video Url"></attribute-editor>
      </div>  -->
    </settings-modal> 
  </module-base>
</template>
<script>
import { mapActions } from 'vuex'
import ModuleBase from './shared/ModuleBase';
import SettingsModal from './shared/SettingsModal';
import topLevelComponents from '../mixins/topLevelComponents';
import AttributeEditor from './shared/AttributeEditor';
import RadioButtons from './shared/radios/RadioButtons';
// import ImageUploader from './shared/ImageUploader';
// import RichText from './shared/RichText';
// import Button from './shared/Button';
import ToggleSwitch from './shared/ToggleSwitch';


// import {customMediaLibrary} from '../functions/medialibrary';

  export default { 
    name: 'video-module', 
    components: {
      ModuleBase,
      SettingsModal,
      AttributeEditor,
      RadioButtons,
      // ImageUploader,
      // RichText,
      // Button,
      ToggleSwitch
    },  
    data: function() {
      return {
        keepInBounds: true,
        type: "blurb-module",
        imageSrc: null
      }
    },
    props: {
      hidecontrols: Boolean,
    },
    methods: {
      ...mapActions(['updateModule']),
      getQueryString( field, url ) {
        var href = url ? url : window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
      },
      getThumb(val) {
        const url = val || this.component.content.youtube.video_url;
        if (!url) { return false }
        const video_id = this.getQueryString('v', url);
        const thumbnail = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`
        this.imageSrc = thumbnail;
        return video_id ? thumbnail : null;
      }
    },
    mounted() {
      this.imageSrc = this.getThumb()
    },
    mixins: [topLevelComponents],
  }
</script>