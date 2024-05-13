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

export const getLastDateOfMonth = (date) => {
  // Get the last date of the month for the selected date
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
//* Set Due Date color *******************************************************
export const setSectionDueColor=(dueDate,progress,totalTask)=>{
  if(progress===0&&totalTask<=0){
    return "#3D405B"
  }
  if(progress===100)
    return "#3D405B"
  else{
    if(new Date().setHours(0,0,0,0)>new Date(dueDate)){
      return "#FF4848"
    }
    else return "#3D405B"
  }
}

//* Set section Due Date color *******************************************************
export const setSectionDueTextColor=(dueDate,progress,totalTask)=>{
  if(progress===0&&totalTask<=0){
    return "black"
  }
  if(progress===100)
    return "black"
  else{
    if(new Date().setHours(0,0,0,0)>new Date(dueDate)){
      return "#FF4848"
    }
    else return "black"
  }
}

//* Set Due Date color *******************************************************

export const convertMinutesToHoursAndMinutes=(totalMinutes) =>{
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes}`;
}

//* task Due Date text Color (White / Black) *********************************

export const dueDateTextColor=(dueDate,status)=>{
  if(status==="Completed"){
    return "black"
  }
  else if(new Date(dueDate).setHours(0,0,0,0)<new Date().setHours(0,0,0,0)){
    return "white"
  }
  else return "black"
}

//* Task Date color for due*****************************************************
export const dueDateColor=(dueDate,status)=>{
  if(status==="Completed"){
    return "black"
  }
  else if(new Date(dueDate).setHours(0,0,0,0)<new Date().setHours(0,0,0,0)){
    return "#FF4848"
  }
  else return "black"
}

//* Task Date font for due*****************************************************************
export const dueDateFontWeight = (dueDate, status) => {
  if (status === "Completed") {
    return "400"; 
  } else if (new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
    return "700";
  } else {
    return "400";
  }
};

//* Task Date Icon for due*****************************************************************
export const dueDateIcon = (dueDate, status) => {
  if (status === "Completed") {
    return "calender-outline"; 
  } else if (new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
    return "due-outline";
  } else {
    return "calender-outline";
  }
};