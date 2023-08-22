
import React, { useEffect, useState } from "react";
import ProfilePage from '../Profile.jsx'
// import server from '../../HTTP/httpCommonParam';
const ReaderProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // server.get('/ge')

    const id = localStorage.getItem("userId");
    setUser({
      ID: '1',
      FIRST_NAME: "Jakaria",
      LAST_NAME: "Hossain",
      ADDRESS: "Pabna, Bangladesh",
      CONTACT_NO: "123-456-7890",
      GENDER: "M",
      EMAIL: "abc@gmail.com",
      IMAGE:
        "https://scontent-sin6-1.xx.fbcdn.net/v/t39.30808-1/355886619_1238439940210020_762558427029608970_n.jpg?stp=dst-jpg_p480x480&_nc_cat=111&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=C8K3prJ4DnYAX_bFIsb&_nc_ht=scontent-sin6-1.xx&oh=00_AfAoPqaImVCpj7X45NfWbgRLZuceaN28EDWl39H-fhtE0A&oe=64EA0BD4",
    });
  }, []);


  return (
    <ProfilePage user={user} />
  )
};

export default ReaderProfile;
