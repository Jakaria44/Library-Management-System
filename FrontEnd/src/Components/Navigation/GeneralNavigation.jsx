import {Home, DensityMedium, Category, FeaturedPlayList} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const GeneralNavigation = () => {
  const navigationsAll = [
    {
      name: "Home",
      icon: <Home/>,
      page: "/Home"
    },
    {
      name: "All Books",
      icon: <DensityMedium/>,
      page: "/AllBooks"
    },
    {
      name: "Categories",
      icon: <Category/>,
      page: "/Categories"
    },
    {
      name: "Featured",
      icon: <FeaturedPlayList/>
    }

  ]
  return (
  <>

  </>

  )
}

export default GeneralNavigation;