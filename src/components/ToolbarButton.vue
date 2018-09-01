<script>
export default {
  name: 'revenues',
  props: {
    name: {
      type: String,
      required: true,
    },
    id: String,
  },
  computed: {
    idComputed() {
      return this.id || this.name;
    },
    button() {
      const self = this;
      return { id: this.idComputed, name: this.name, action: () => self.$emit('click') };
    },
  },
  mounted() {
    this.$store.commit('setToolbarButton', this.button);
  },
  updated() {
    this.$store.commit('setToolbarButton', this.button);
  },
  destroyed() {
    this.$store.commit('removeToolbarButton', this.idComputed);
  },
};
</script>
