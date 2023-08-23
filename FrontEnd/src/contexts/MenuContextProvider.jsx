import { createContext, useContext, useReducer } from "react";
import { actions } from "./actions.jsx";

// menu opened
const MenuContext = createContext(true);
const MenuDispatchContext = createContext(null);

// TODO: add initial id from current location of the url
const initialState = {
  opened: true,
  id: document.location.pathname.toString().split("/")[1],
};
export function MenuContextProvider({ children }) {
  const [menuOpened, dispatch] = useReducer(MenuReducer, initialState);

  return (
    <MenuContext.Provider value={menuOpened}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
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
  const Menu = useContext(MenuContext);
  if (Menu === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return Menu;
};

export const useMenuDispatch = () => {
  const dispatch = useContext(MenuDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useMenuDispatch must be used within a MenuProvider");
  }
  return dispatch;
};
