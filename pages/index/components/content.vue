<template>
  <view :class="{'is_fixed':isFixed}">
    <scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
      <view>
        <block v-for="(item, index) in tab" :key="index">
          <view
            class="list-cont"
            :class="{active:index===num}"
            @click="handleTabClick(index,item.nav)"
          >
            <view>
              <text class="con-text-a" :class="{activeb:item.checked}">{{ item.name }}</text>
            </view>
            <view>
              <text class="con-text-b" :class="{activeb:item.checked}">{{ item.title }}</text>
            </view>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { requestList } from "../../../common/cloudfun.js";
import { mapMutations } from "vuex";
// 引入攻略列表的数据库接口
export default {
  name: "tab",
  props: {
    isFixed: Boolean,
    tab: Array,
  },
  data() {
    return {
      num: 0,
      pageid: 0,
    };
  },
  methods: {
    handleTabClick(index, nav) {
      this.num = index;
      let navData = {
        nav,
        pageId: this.pageid,
      };
      this.$store.commit("setLoading", true);
      this.$store.commit("setNavData", navData);

      requestList(nav, this.pageid)
        .then((res) => {
          this.$store.commit("setLists", res.data);
          this.$store.commit("setLoading", false);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.active {
  background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
  border-top-right-radius: 50upx;
}

.activeb {
  color: #292c33 !important;
}

.scroll {
  white-space: nowrap;
  width: 100%;
  /* position: absolute;
  left: 0;
  right: 0; */
  background: #ffffff;
  padding: 20upx 0;
}

.con-text-a {
  color: #292c33;
  font-size: 30upx;
  font-weight: bold;
}

.con-text-b {
  color: #9ea0a5;
  font-size: 23upx;
}

.list-cont {
  width: 180upx;
  display: inline-block;
  text-align: center;
}
.is_fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
}
</style>
