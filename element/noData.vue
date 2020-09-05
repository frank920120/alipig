<template>
  <view class="nodata">
    <image src="../static/tab/noimage.png" mode="widthFix" />
    <text>主人，这里什么都没有</text>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
.nodata image {
  width: 200upx;
  height: 200upx;
}
.nodata text {
  display: block;
  font-size: 30upx;
  color: rgb(153, 153, 153);
}
.nodata {
  text-align: center;
}
</style>