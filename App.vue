<script>
export default {
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "ali-app-i1r7l",
        traceUser: true,
      });
    }
  },
};
</script>

<style>
/*每个页面公共css */
</style>
