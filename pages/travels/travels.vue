<template>
  <view class="travels">
    <view class="classify-view">
      <view class="classify-text">分类</view>
      <block v-for="(item,index) in fication" :key="index">
        <view class="classify">
          <text
            :class="{ activetext: index == num }"
            @click="menubtn(index,item.name)"
          >{{item.name}}</text>
        </view>
      </block>
    </view>
    <view class="travels-title">
      <input type="text" placeholder="给旅行日记起个标题吧" class="place-text" v-model="titledata" />
    </view>
    <!-- 描述 -->
    <view class="travels-describe">
      <textarea placeholder="描述下你的旅行心得,帮助更多旅行的人" v-model="tipsdata" />
    </view>
    <view class="travels-image">
      <view class="topimg">
        <image src="../../static/tab/topimg.png" mode="widthFix" @click="uploadImg()" />
      </view>
      <!-- 九宫格 -->
      <view class="conteng">
        <block v-for="(item,index) in topimg" :key="index">
          <view class="conteng-img">
            <image :src="item" mode="aspectFill" class="uploadimg" @click="preImage(index)" />
            <image
              src="../../static/tab/deteimg.svg"
              mode="widthFix"
              class="deleteimg"
              @click="deleteImg(index)"
            />
          </view>
        </block>
      </view>
    </view>

    <!-- 上传视频 -->
    <view class="travels-video">
      <view class="topimg">
        <image src="../../static/tab/topvideo.png" mode="widthFix" @click="uploadVideo()" />
      </view>
      <view class="uploadvideo" v-if="uploadvideos">
        <video
          :src="videos"
          controls
          objectFit="cover"
          poster="http://h.thexxdd.cn/video/postimage.jpg"
        />
        <image class="pause" src="../../static/tab/delvideo.png" @click="deleteVideo()" />
      </view>
    </view>
    <!-- 定位 -->
    <view class="address">
      <view class="address-text">你在哪里</view>
      <view class="address-site">
        <image src="../../static/tab/addimg.svg" mode="widthFix" />
        <text @click="chooseCity()">{{address}}</text>
      </view>
    </view>

    <!-- 发布 -->
    <view class="release" @click="submit()">发布</view>
    <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import { previewImage, getLocation } from "../../common/list";
import { mapState } from "vuex";
import HMmessages from "@/components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
      num: 0,
      fication: [
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
      tipsdata: "",
      titledata: "",
      topimg: [],
      uploadvideos: false,
      videos: "",
      address: "",
      currentPage: "",
      submitData: { category: "景点" },
    };
  },
  components: { HMmessages },
  onLoad() {
    this.getLocation();
    let page = getCurrentPages();
    this.currentPage = page[1].route;
    this.$store.commit("setCurrentPage", this.currentPage);
  },
  computed: {
    ...mapState(["publishCities"]),
    countCity() {
      this.address = this.publishCities.name;
    },
  },
  methods: {
    menubtn(index, name) {
      this.num = index;
      console.log(name);
      this.submitData = { ...this.submitData, category: name };
    },
    async preImage(index) {
      try {
        const res = await previewImage(index, this.topimg);
        console.log("预览成功");
      } catch (error) {
        console.log("预览失败");
      }
    },
    deleteImg(index) {
      this.topimg = this.topimg.filter((img) => this.topimg[index] !== img);
    },
    uploadImg() {
      uni.chooseImage({
        count: 9, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          this.topimg = [...this.topimg, ...tempFilePaths];
          //   uni.uploadFile({
          //     url: "https://www.example.com/upload", //仅为示例，非真实的接口地址
          //     filePath: tempFilePaths[0],
          //     name: "file",
          //     formData: {
          //       user: "test",
          //     },
          //     success: (uploadFileRes) => {
          //       console.log(uploadFileRes.data);
          //     },
          //   });
        },
      });
    },
    uploadVideo() {
      uni.showLoading({
        title: "上传中",
      });
      uni
        .chooseVideo({
          count: 1,
          sourceType: ["camera", "album"],
          maxDuration: 20,
        })
        .then((res) => {
          this.videos = res[1].tempFilePath;
          this.uploadvideos = true;
        })
        .catch((err) => {
          this.uploadvideos = false;
          console.log(err);
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    // 删除视频
    deleteVideo() {
      this.videos = "";
      this.uploadvideos = false;
    },
    async getLocation() {
      try {
        const res = await getLocation();
        this.address = res.result.ad_info.city;
      } catch (error) {
        this.address = "上海市";
        console.log("定位失败");
      }
    },
    chooseCity() {
      uni.navigateTo({
        url: "../city/city",
      });
    },
    submit() {
      this.userInfo();
      if (this.titledata == "") {
        let tip = "标题必填";
        this.proMpt(tip);
      } else if (this.tipsdata == "") {
        let tip = "描述必填";
        this.proMpt(tip);
      } else if (this.topimg.length < 3) {
        let tip = "上传的图片不少于三张";
        this.proMpt(tip);
      } else {
        this.userInfo();
      }
      this.submitData = {
        ...this.submitData,
        tipsdata: this.tipsdata,
        titledata: this.titledata,
        topimg: this.topimg,
        video: this.video,
        location: this.address,
      };
    },
    userInfo() {
      let db = wx.cloud.database();
      let users = db.collection("user");
      users
        .get()
        .then((res) => {
          console.log(res);
          // length == 0说明用户没有登录
          if (res.data.length == 0) {
            console.log("没有登录");
            // 弹出模态框
            let message = "请登录后再操作";
            this.$nextTick(() => {
              //dom更新循环结束之后的延迟回调
              this.$refs.mon.init(message);
            });
          } else {
            console.log("已经登陆");
            // 取到用户头像，昵称，openid
            let usermen = res.data[0];
            this.avatarUrl = usermen.avatarUrl;
            this.nickName = usermen.nickName;
            this.openid = usermen._openid;
            // 可以上传用户提交的数据到数据库
            this.relend = true;
            this.userdata();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    proMpt(tip) {
      this.HMmessages.show(tip, {
        icon: "error",
        iconColor: "#ffffff",
        fontColor: "#ffffff",
        background: "rgba(102,0,51,0.8)",
      });
    },
  },
};
</script>

<style scoped>
.travels {
  padding: 10upx 20upx;
}
.classify text {
  display: block;
  font-size: 27upx;
  color: #14181e;
  background: #f7f7f7;
  padding: 10upx 20upx;
  border-radius: 20upx;
  margin: 0 30upx;
}
.classify {
  display: flex;
}
.classify-text {
  font-size: 30upx;
  color: #14181e;
  font-weight: bold;
}
.classify-view {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/* 选中的样式 */
.activetext {
  background: #ffdd00 !important;
}
/* 标题 */
.place-text {
  color: #808080 !important;
  font-size: 30upx;
}
.travels-title {
  margin: 40upx 0;
}
/* 描述 */
.travels-describe textarea {
  width: 100%;
  color: #808080 !important;
  font-size: 30upx;
}
/* 上传图片 */
.topimg image {
  width: 150upx;
  height: 150upx;
  border-radius: 20upx;
}
.topimg {
  padding-left: 20upx;
  padding-top: 10upx;
}
/* 九宫格 */
.conteng {
  display: flex;
  flex-wrap: wrap;
  margin-left: 4px;
  margin-right: 4px;
}
.conteng-img {
  width: calc((100% / 4) - 8px) !important;
  margin: 4px;
  height: 176upx;
  position: relative;
}
.uploadimg {
  width: 100% !important;
  height: 100% !important;
  border-radius: 10upx;
}
/* 删除图片 */
.deleteimg {
  width: 38upx;
  height: 38upx;
  position: absolute;
  top: 6upx;
  right: 6upx;
}
/* 视频 */
.uploadvideo video {
  width: 100%;
  height: 400upx;
  border-radius: 5upx;
}
.uploadvideo {
  margin: 0 8px;
  border-radius: 5upx;
  position: relative;
}
/* 覆盖视频 */
.pause {
  width: 50upx;
  height: 50upx;
  position: absolute;
  top: 6upx;
  right: 6upx;
}
/* 位置 */
.address-site {
  display: flex;
  align-items: center;
}
.address-site image {
  width: 40upx;
  height: 40upx;
  margin-right: 10upx;
}
.address-site text {
  font-size: 30upx;
  color: #00a2ff;
}
.address-text {
  font-size: 30upx;
  color: #333333;
  padding-right: 40upx;
}
.address {
  display: flex;
  background: #f1f1f1;
  padding: 20upx 0 20upx 20upx;
  margin-top: 30upx;
  margin-bottom: 160upx;
}
/* 发布 */
.release {
  background: #ffdd00;
  width: 100%;
  height: 100upx;
  font-size: 40upx;
  line-height: 100upx;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
/* 提示用户上传成功与否 */
.warp {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}
.warp-view {
  width: 500upx;
  height: 200upx;
  background: #ffffff;
  margin: auto;
  position: absolute;
  -webkit-position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 8upx;
  overflow: hidden;
}
/* 提示框 */
.tipmin text {
  font-size: 34upx;
  display: flex;
  justify-content: center;
  line-height: 200upx;
}
</style>