<template>
  <view>
    <!--搜索城市 -->
    <view class="margin-search">
      <view class="search-cont">
        <view class="city-search">
          <image src="../../static/tab/sousuo.svg" mode="widthFix" class="search-img" />
          <input
            type="text"
            placeholder="发现你感兴趣的目的地"
            :value="searchInput"
            @focus="searchCity"
            @input="handleSearch"
          />
        </view>
        <view class="search-code" v-if="!citynone" @click="handleClose">
          <image src="../../static/tab/chaa.svg" mode="widthFix" />
        </view>
      </view>
    </view>

    <!-- 点击搜索隐藏 -->
    <view v-if="citynone">
      <!-- 定位城市 -->
      <view class="city-view">
        <view class="city-text">当前定位城市</view>
        <view class="posit-city">
          <image src="../../static/tab/gonglveb.png" mode="widthFix" />
          <text class="city-text" @click="clickCity">{{address}}</text>
        </view>
      </view>

      <!-- 热门城市 -->
      <view class="hot-city">热门城市</view>
      <view class="menu-block">
        <block v-for="(item,index) in city" :key="index">
          <view @click="hotCity(item.name)">{{item.name}}</view>
        </block>
      </view>
    </view>
    <!-- 显示搜索的城市 -->
    <view class="results" v-if="!citynone">
      <block v-for="(item,index) in citydata" :key="index">
        <view class="results-city" @click="seekCity(item)">
          <image src="../../static/tab/gonglveb.png" mode="widthFix" />
          <text>{{item}}</text>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { getLocation, getSuggestion } from "../../common/list";
import { mapState } from "vuex";
export default {
  data() {
    return {
      city: [
        {
          name: "昆明市",
        },
        {
          name: "大理白族自治州",
        },
        {
          name: "北京市",
        },
        {
          name: "上海市",
        },
        {
          name: "广州市",
        },
        {
          name: "深圳市",
        },
        {
          name: "杭州市",
        },
      ],
      citynone: true,
      citydata: "",
      address: "",
      searchInput: "",
      currentP: "",
    };
  },
  onReady() {
    this.getLocation();
  },
  computed: {
    ...mapState(["currentPage"]),
    countCurrentpage() {
      this.currentP = this.currentPage.name;
    },
  },
  watch: {
    searchInput(val, oldval) {
      this.getSuggestion();
    },
  },
  methods: {
    clickCity() {
      this.routeCity(this.address);
    },
    hotCity(city) {
      this.routeCity(city);
    },
    routeCity(city) {
      console.log(this.currentP);
      if (this.currentP == "pages/strategy/strategy") {
        this.$store.commit("setHotCity", city);
      } else {
        this.$store.commit("setPublishedCity", city);
      }
      uni.navigateBack({
        delta: 1,
      });
    },
    searchCity(e) {
      this.citynone = false;
    },
    handleClose() {
      this.citynone = true;
      this.citydata = [];
      this.searchInput = "";
    },
    handleSearch(e) {
      let { value } = e.target;
      this.searchInput = value;
    },
    seekCity(city) {
      this.$store.commit("setHotCity", city);
      this.routeCity();
    },
    async getSuggestion() {
      try {
        const res = await getSuggestion(this.searchInput);
        console.log(res);
        let cityTitle = res.data.map((city) => city.title);
        let { city } = res.data[0];
        this.citydata = [city, ...cityTitle];
      } catch (error) {
        console.log(error);
      }
    },
    async getLocation() {
      try {
        const res = await getLocation();
        this.address = res.result.ad_info.city;
      } catch (error) {
        this.address = "上海市";
      }
    },
  },
};
</script>

<style>
page {
  background: #ffffff;
}
/* 搜索城市 */
.margin-search {
  margin-bottom: 40upx;
}
.city-search {
  height: 70upx;
  line-height: 70upx;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #f8f8f8;
  border-radius: 50upx;
}
.search-img {
  margin: auto 0 auto 20upx;
  width: 40upx;
  height: 40upx;
}
.city-search input {
  height: 70upx;
  line-height: 70upx;
  width: 100%;
  font-size: 30upx;
  color: #666666;
}
.search-cont {
  display: flex;
  justify-content: space-between;
  height: 70upx;
  align-items: center;
  background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
  padding: 30upx 20upx;
}
.search-code image {
  width: 50upx;
  height: 50upx;
}
.search-code {
  width: 50upx;
  height: 50upx;
  padding: 0 15upx;
}
/* 定位城市 */
.city-view image {
  width: 40upx;
  height: 40upx;
  padding-right: 20upx;
}
.city-text {
  font-size: 30upx;
  color: #3f3f3f;
}
.posit-city {
  display: flex;
  align-items: center;
  padding-left: 35upx;
}
.city-view {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  padding: 20upx 10upx;
  margin: 0 20upx;
  border-radius: 6upx;
}
/* 热门城市 */
.hot-city {
  font-size: 30upx;
  color: #999999;
  margin: 50upx 20upx 0 20upx;
}
.menu-block view {
  background: #f7f7f7;
  border-radius: 6upx;
  font-size: 27upx;
  color: #333333;
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
/* 搜索的结果 */
.results text {
  display: block;
  font-size: 30upx;
  color: #ee9900;
}
.results-city image {
  width: 40upx;
  height: 40upx;
  padding-right: 20upx;
}
.results-city {
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  padding: 20upx 0;
  margin: 0 20upx;
}
</style>