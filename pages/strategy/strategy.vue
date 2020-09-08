<template>
  <view>
    <Address :address="address" />
    <Locality />
    <Content />
    <view class="publish animate__animated animate__fadeInUp" @click="handlePublish">
      <image src="../../static/tab/fab.png" mode="widthFix" />
    </view>
  </view>
</template>

<script>
import address from "./components/address.vue";
import content from "./components/content.vue";
import locality from "./components/locality.vue";
import { getLocation } from "../../common/list";
import { mapState } from "vuex";
export default {
  data() {
    return {
      address: "",
      currentPage: "",
    };
  },
  components: {
    address,
    content,
    locality,
  },
  computed: {
    ...mapState(["hotCities"]),
    countCity() {
      this.address = this.hotCities.name;
    },
  },
  onLoad() {
    let page = getCurrentPages();
    this.currentPage = page[0].route;
    console.log(page);
    this.$store.commit("setCurrentPage", this.currentPage);
    this.hotCities.name
      ? (this.address = this.hotCities.name)
      : this.getLocation();
  },
  methods: {
    async getLocation() {
      try {
        const res = await getLocation();
        this.address = res.result.ad_info.city;
      } catch (error) {
        this.address = "上海市";
      }
    },
    handlePublish() {
      uni.navigateTo({
        url: "../travels/travels",
      });
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
