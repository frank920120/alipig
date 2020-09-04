<template>
  <view>
    <Search :banners="banners" />
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
      banners: "",
      tab: "",
    };
  },
  created() {
    const db = wx.cloud.database();
    const banner = db.collection("banner");
    banner
      .get()
      .then((res) => (this.banners = res.data))
      .catch((err) => console.log(err));

    const tab = db.collection("tab");
    tab
      .get()
      .then((res) => (this.tab = res.data))
      .catch((err) => console.log(err));
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
