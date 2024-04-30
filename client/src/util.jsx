//* Get status color ***********************************************
export const getStatusColors = (status) => {
  if (status === "completed") { 
    return "#3A9679";
  } else if (status === "In progress") {
    return "#0802A3";
  } else if (status === "To do") {
    return "#9376E0";
  } else if (status === "Others") {
    return "#FF4B91";
  }
};
//* Month Names ****************************************************
export const monthsValue = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//* Pad 0 **********************************************************
export const padZero = (number) => {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};

//* Get formatted date *********************************************
export const formattedDate = (date) => {
  const dateStr = new Date(date).toLocaleDateString("en-UK").split("/");
  const dateFormat = [dateStr[2], dateStr[1], dateStr[0]].join("-");
  return dateFormat;
};

//* Get Date-Time data *********************************************
export const getTimeData = (date, noTime = false, noDay = false) => {
  const f_Date = formattedDate(date).split("-").reverse().join("/");
  const f_Time = getTime(date);
  return `${f_Date}${noTime ? "" : ` (${f_Time})`}`;
};

//* Get Day-Date data *********************************************
export const getDayDate = (date, noTime = false, noDay = false) => {
  const f_Date = formattedDate(date).split("-").reverse().join("/");
  const f_Time = getTime(date);
  const f_Day = weekdays[new Date(date).getDay()].slice(0, 3);
  return `${noDay ? "" : f_Day + " "}${f_Date}${noTime ? "" : ` (${f_Time})`}`;
};

//* Get Time *******************************************************
export const getTime = (date) => {
  let f_Time = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const timeArr = f_Time.split(":");
  f_Time = padZero(timeArr[0]) + ":" + timeArr[1];

  return f_Time;
};