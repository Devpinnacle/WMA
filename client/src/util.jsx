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