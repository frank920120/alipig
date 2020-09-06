<template>
  <view class="active">
    <view class="conteng">
      <block v-for="(item,index) in localdata" :key="index">
        <view class="conteng-article newing" @click="localCont(item.id)">
          <view class="conteng-img">
            <block v-for="(itemimg,index) in item.datainfo.staticimg" :key="index">
              <image :src="itemimg" mode="aspectFill" />
            </block>
          </view>
          <!-- 文字介绍 -->
          <view class="active-introduce">
            <view class="active-name">{{item.datainfo.titledata}}</view>
            <view class="active-title">{{item.datainfo.tipsdata}}</view>
          </view>
          <view class="purchase userinfo">
            <image :src="item.datainfo.avatarUrl" mode="widthFix" />
            <text class="active-purchase">{{item.datainfo.nickName}}</text>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  name: "cont",
  props: {
    // localdata:Array
  },
  data() {
    return {
      localdata: [
        {
          datainfo: {
            staticimg: [
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
            ],
            titledata: "2019-02-20",
            tipsdata: "2020-01-20",
            nickName: "frank",
          },
        },
        {
          datainfo: {
            staticimg: [
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
            ],
            titledata: "2019-02-20",
            tipsdata: "2020-01-20",
            nickName: "frank",
          },
        },
        {
          datainfo: {
            staticimg: [
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
              "cloud://ali-app-i1r7l.616c-ali-app-i1r7l-1301699426/lists/a6.jpg",
            ],
            titledata: "2019-02-20",
            tipsdata: "2020-01-20",
            nickName: "frank",
          },
        },
      ],
    };
  },
  methods: {
    localCont(id) {
      console.log(id);
      uni.navigateTo({
        url: "../details/detalis?id=" + id,
      });
    },
  },
};
</script>

<style scoped>
@import "../../../common/uni.css";
/* 用户 */
.userinfo image {
  width: 50upx;
  height: 50upx;
  border-radius: 50upx;
}
.userinfo text {
  padding-left: 20upx;
}
.userinfo {
  padding-top: 20upx;
}
.newing {
  padding-bottom: 30upx;
}
</style>
