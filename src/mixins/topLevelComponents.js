export default {
    provide() {
        return {
            component: this.component,
            parent_id: this.parent_id,
        }
    },
    props: {
        component: Object,
        parent_id: String
      },
}