export const minutesToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  };

 export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 before padding
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`.toString();
  };

  export const dashedFormatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 before padding
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`.toString();
  }

  export const formatStringDate = (dateString) => {
   if(dateString){
    const [day, month, year ] = dateString.split("-");
    return `${year}-${month}-${day}`;} 
  };
  
  
