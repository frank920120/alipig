<template>
  <view>
    <view class="locality">
      <view class="title">当地必体验</view>
    </view>
    <!-- tab -->
    <view class="menu-block">
      <block v-for="(city,index) in citytab" :key="index">
        <view @click="menubtn(index)" :class="index===num?'activetext':''">{{city.name}}</view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  name: "local",
  data() {
    return {
      num: 0,
      citytab: [
        {
          name: "全部",
        },
        {
          name: "景点",
        },
        {
          name: "美食",
        },
        {
          name: "网红打卡",
        },
      ],
    };
  },

  methods: {
    menubtn(index, name) {
      // console.log(index)
      // console.log(name)
      this.num = index;
      // 用子组件调用父组件方法
      //   this.$parent.fatherMethod(name);
    },
  },
};
</script>

<style scoped>
.locality {
  margin: 0 20upx;
}
.title {
  color: #292c33;
  font-size: 50upx;
}
.activetext {
  color: #4cd964;
  background: #ffdd00 !important;
  border: 1px solid #ffdd00 !important;
}
.menu-block view {
  background: #ffffff;
  border: 1px solid #c2c5cc;
  border-radius: 6upx;
  font-size: 25upx;
  color: #292c33;
  font-weight: bold;
  text-align: center;
  padding: 15upx;
  margin: 20upx;
}

.menu-block {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
