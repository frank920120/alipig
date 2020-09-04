const db = wx.cloud.database();

const request = (name) => {
  return new Promise((resolve, reject) => {
    const result = db.collection(name);
    result
      .get()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default request;
