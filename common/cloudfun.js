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
const requestList = (list, pageid) => {
  console.log(pageid);
  return new Promise((resolve, reject) => {
    const result = db.collection(list).limit(6).skip(pageid);
    result
      .get()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export { request, requestList };
