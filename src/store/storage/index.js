export default {
  getData(key) {
    const data = localStorage.getItem(key);
    let parsedData = null;
    if (data) {
      parsedData = JSON.parse(data);
    }
    return parsedData;
  },
  setData(key, _data) {
    const data = JSON.stringify(_data);
    localStorage.setItem(key, data);
  }
}