export const removeDuplicates = (arrArg, element) => {
    let double = false;
    let filterElement = arrArg.filter((elem, pos, arr) => {
        if(arr.indexOf(elem) === pos){
            double = false;
            return elem;
        }else {
             double = true;
             return '';
        }
    });

    if (double){
        let index = filterElement.indexOf(element);
        filterElement.splice(index, 1);
    }
  return filterElement;
}