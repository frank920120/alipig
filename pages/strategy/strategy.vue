<template>
  <view>
    <Address />
    <Locality />
    <Content />
  </view>
</template>

<script>
import address from "./components/address.vue";
import content from "./components/content.vue";
import locality from "./components/locality.vue";
export default {
  data() {
    return {};
  },
  components: {
    address,
    content,
    locality,
  },
  methods: {},
};
</script>

<style>
</style>
