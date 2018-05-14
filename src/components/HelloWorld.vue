<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Sample global value is: {{ sampleVal }}</h2>
    <NewCharge/>
  </div>
</template>

<script>

import NewCharge from '@/components/NewCharge';


export default {
  name: 'HelloWorld',
  components: {
    NewCharge,
  },
  data() {
    return {
      msg: 'Welcome to Flat App',
      sampleVal: this.$store.state.sample,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
