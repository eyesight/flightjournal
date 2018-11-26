export const compare = (a, b, sortname) => {
    const nameA = a[sortname].toUpperCase();
    const nameB = b[sortname].toUpperCase();
    
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
}