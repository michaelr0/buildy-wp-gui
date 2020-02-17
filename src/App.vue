<template>
  <div v-if="pagebuilder" id="buildy-root" class="page-wrap">
    <container-module :components="pagebuilder" adminClass="w-full"></container-module>
  </div>
</template>

<script>
import ContainerModule from './components/layout/ContainerModule';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
   components: {
    ContainerModule
  },
  computed: {
    pagebuilder () {
      //console.log(this.$store.getters.pagebuilder).
      return this.$store.getters.pagebuilder;
    }
  },
  props: {
    msg: String,
    config: String,
  },
  methods: {
    ...mapActions(['init']),  
  },
  created() {
    if (this.config) {
      this.init(this.config);
    }
    
    //console.log('app',JSON.parse(this.content));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
