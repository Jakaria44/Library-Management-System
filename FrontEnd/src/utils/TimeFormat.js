const TimeFormat = (dateIn) => {
  const date = new Date(dateIn);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  const amPm = hour >= 12 ? 'PM' : 'AM';
  
  hour = hour % 12 || 12; // Convert to 12-hour format
  hour = hour.toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hour}:${minute} ${amPm}`;
};
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export function TimeFormat2(dateIn) {
  const date = new Date(dateIn);
  const day = date.getDate().toString().padStart(2, '0');
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export default TimeFormat