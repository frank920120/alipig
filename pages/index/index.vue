<template>
  <view>
    <Search :banner="banner" />
    <Ticket />
    <Classify />
    <Content id="boxFixed" :isFixed="isFixed" :tab="tab" />
    <load-list v-if="loadingList"></load-list>
    <Article :Articleend="Articleend" v-if="!loadingList" />
    <home-load v-if="homeload"></home-load>
    <no-data v-if="nodata"></no-data>
  </view>
</template>

<script>
import Search from "./components/search.vue";
import Ticket from "./components/ticket.vue";
import Classify from "./components/classify.vue";
import Content from "./components/content.vue";
import Article from "./components/article.vue";
import { request, requestList } from "../../common/cloudfun.js";
import { mapState } from "vuex";
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
      Articleend: "",
      loadingList: "true",
      pageid: 0,
      nav: "",
      nodata: false,
      homeload: true,
    };
  },
  created() {
    let banner = request("banner");
    let tab = request("tab");
    let listing = requestList("recommend", this.pageid);
    this.loadingList = true;
    Promise.all([banner, tab, listing]).then((res) => {
      this.banner = res[0].data;
      this.tab = res[1].data;
      this.Articleend = res[2].data;
      this.loadingList = false;
      this.homeload = false;
    });
  },
  computed: {
    ...mapState(["list", "navLoading", "navData"]),
    count() {
      this.Articleend = this.list.listing;
    },
    countLoading() {
      this.loadingList = this.navLoading.loadingList;
    },
    countNav() {
      this.nav = this.navData.nav;
      this.pageid = this.navData.pageId;
    },
  },
  onPageScroll(e) {
    this.rect = e.scrollTop;
    if (this.rect > this.menutop) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  },
  onReachBottom() {
    this.pageid += 6;
    let listing = requestList(this.nav, this.pageid);
    listing.then((res) => {
      if (res.data.length == 0) {
        this.nodata = true;
      } else {
        this.Articleend = [...this.Articleend, ...res.data];
      }
    });
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
