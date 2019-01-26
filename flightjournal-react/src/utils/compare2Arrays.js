export const compare2Arrays = (a, b) => {
  const finalArray=[];
  a.forEach(el1 => {
    b.forEach(el2=>{
      if(el1 === el2){
        finalArray.push(el1);
      }
    })
  });
  return finalArray;
}