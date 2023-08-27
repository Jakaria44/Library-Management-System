
const TimeFormat = (dateIn) => {
    const date = new Date(dateIn);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const amPm = hour >= 12 ? "PM" : "AM";
    
     return  `${day}-${month}-${year} ${hour}:${minute} ${amPm}`;
}
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export function TimeFormat2(dateIn){
    const date = new Date(dateIn);
    const day = date.getDate();
    const month = monthNames[date.getMonth()] ;
    const year = date.getFullYear();
    
     return  `${day} ${month}, ${year} `;
}

export default TimeFormat