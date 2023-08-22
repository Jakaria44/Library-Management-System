import React, { useEffect, useState } from "react";
import ProfilePage from "../Profile.jsx";
// import server from '../../HTTP/httpCommonParam';
const ReaderProfile = () => {
  const [user, setUser] = useState({
    ID: "1",
    FIRST_NAME: "Jakaria",
    LAST_NAME: "Hossain",
    ADDRESS: "Pabna, Bangladesh",
    CONTACT_NO: "123-456-7890",
    GENDER: "M",
    EMAIL: "abc@gmail.com",
    IMAGE: "https://placekitten.com/400/400", // Replace with your image URL
  });

  useEffect(() => {
    // server.get('/ge')
    // const id = localStorage.getItem("userId");
    // setUser();
  }, []);

  return <ProfilePage user={user} />;
};

export default ReaderProfile;
