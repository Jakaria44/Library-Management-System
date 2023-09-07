import { createContext, useContext, useReducer } from "react";
import { actions } from "./actions.jsx";

// menu opened
const MenuContext = createContext(true);

// TODO: add initial id from current location of the url
const initialState = {
  opened: true,
  id: document.location.pathname.toString().split("/")[1],
};
export function MenuContextProvider({ children }) {
  const [menuOpened, dispatch] = useReducer(MenuReducer, initialState);

  return (
    <MenuContext.Provider value={{ menuOpened, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
}

function MenuReducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case actions.TOGGLE_SIDE_DRAWER: {
      return {
        ...state,
        opened: !state.opened,
      };
    }
    case actions.OPEN_MENU: {
      console.log(action.opened);
      return {
        ...state,
        id: action.opened,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const useMenu = () => {
  const { menuOpened, dispatch } = useContext(MenuContext);
  if (menuOpened === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return { menuOpened, dispatch };
};
