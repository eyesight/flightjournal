export const updateLastUpdateArray =(data, actualData) => {
  let lastupdateArr = [];

  if(data === ''){
      lastupdateArr.push(actualData);
  }else{
      lastupdateArr = lastupdateArr.concat(data);
      lastupdateArr.push(actualData);
  }
  return lastupdateArr;
}