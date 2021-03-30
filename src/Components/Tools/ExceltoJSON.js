export const  ExcelDateToJSDate = (serial)=> {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    if((date_info.getMonth()+1) < 10  && date_info.getDate() <10){
        return `0${date_info.getDate()}/0${date_info.getMonth()+1}/${date_info.getFullYear()}`
    }
    else if((date_info.getMonth()+1) < 10  && date_info.getDate() >10){
        return `${date_info.getDate()}/0${date_info.getMonth()+1}/${date_info.getFullYear()}`
    }
    else if((date_info.getMonth()+1) > 10  && date_info.getDate() <10){
        return `0${date_info.getDate()}/${date_info.getMonth()+1}/${date_info.getFullYear()}`
    }
    else{
        return `${date_info.getDate()}/${date_info.getMonth()+1}/${date_info.getFullYear()}`
    }
 
    // const date = `${date_info.getDate()}/`; 
   // return date 
    // return new Date(date_info.getDate(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }