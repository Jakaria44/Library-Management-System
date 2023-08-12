import {Beenhere, Favorite, Reviews} from "@mui/icons-material";

const UserNavigation =()=>{

  const userNavigations = [
    {
      name: "Favorites",
      icon: <Favorite/>
    }, {
      name: "Wishlist",
      icon: <Beenhere/>
    }, {
      name: "Reviewed",
      icon: <Reviews/>
    },

  ]
  
  return (
    <>
      <div>userNavigations</div>
    </>
  )
}

export default UserNavigation;