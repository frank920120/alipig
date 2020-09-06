var QQMapWX = require("./qqmap-wx-jssdk");
const getLocation = function () {
  return new Promise((resolve, reject) => {
    let qqmapsdk = new QQMapWX({
      key: "OMGBZ-3UXKS-3VAOX-6UBF3-H6HGH-44B3X",
    });
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

export default getLocation;
