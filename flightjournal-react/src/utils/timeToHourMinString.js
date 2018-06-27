export const timeToHourMinString = (time) => {
    const akthour = Math.floor(Number(time)/60);
    const aktminute = Number(time)%60;
    let flighttimeString = `${akthour} h ${aktminute} min`
  return flighttimeString;
}