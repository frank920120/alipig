<template>
  <view>
    <Address />
    <Locality />
    <Content />
    <view class="publish animated fadeInUp">
      <image src="../../static/tab/fab.png" mode="widthFix" />
    </view>
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

<style scoped>
.publish image {
  width: 120upx !important;
  height: 100upx !important;
  border-radius: 40upx;
}
.publish {
  position: fixed;
  bottom: 20upx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
</style>
