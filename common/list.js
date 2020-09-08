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

const getSuggestion = function (info) {
  return new Promise((resolve, reject) => {
    let qqmapsdk = new QQMapWX({
      key: "OMGBZ-3UXKS-3VAOX-6UBF3-H6HGH-44B3X",
    });
    qqmapsdk.getSuggestion({
      keyword: info,
      filter: "category=景点",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

const previewImage = function (index, imageLists) {
  return new Promise((resolve, reject) => {
    uni
      .previewImage({
        current: index,
        urls: imageLists,
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export { getLocation, getSuggestion, previewImage };
