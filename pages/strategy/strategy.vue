<template>
  <view>
    <Address :address="address" />
    <Locality />
    <Content />
    <view class="publish animate__animated animate__fadeInUp">
      <image src="../../static/tab/fab.png" mode="widthFix" />
    </view>
  </view>
</template>

<script>
import address from "./components/address.vue";
import content from "./components/content.vue";
import locality from "./components/locality.vue";
import getLocationRequest from "../../common/list";
export default {
  data() {
    return {
      address: "",
    };
  },
  components: {
    address,
    content,
    locality,
  },
  created() {
    this.getLocation();
  },
  methods: {
    async getLocation() {
      try {
        const res = await getLocationRequest();
        this.address = res.result.ad_info.city;
      } catch (error) {
        this.address = "上海市";
      }
    },
  },
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
