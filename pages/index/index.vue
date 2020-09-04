<template>
  <view>
    <Search :banner="banner" />
    <Ticket />
    <Classify />
    <Content id="boxFixed" :isFixed="isFixed" :tab="tab" />
    <Article />
  </view>
</template>

<script>
import Search from "./components/search.vue";
import Ticket from "./components/ticket.vue";
import Classify from "./components/classify.vue";
import Content from "./components/content.vue";
import Article from "./components/article.vue";
import request from "../../common/cloudfun.js";
export default {
  components: {
    Search,
    Ticket,
    Classify,
    Content,
    Article,
  },
  data() {
    return {
      isFixed: false,
      rect: "",
      menutop: "",
      banner: "",
      tab: "",
    };
  },
  created() {
    let banner = request("banner");
    let tab = request("tab");
    Promise.all([banner, tab]).then((res) => {
      this.banner = res[0].data;
      this.tab = res[1].data;
    });
  },
  onPageScroll(e) {
    this.rect = e.scrollTop;
    if (this.rect > this.menutop) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  },
  onLoad() {
    const query = wx.createSelectorQuery();
    query.select("#boxFixed").boundingClientRect();
    query.exec((res) => {
      this.menutop = res[0].top - 20;
    });
  },
};
</script>

<style scoped>
</style>
