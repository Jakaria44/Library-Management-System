import { createContext, useContext, useReducer } from "react";
import { actions } from "./actions.jsx";

// menu opened
const MenuContext = createContext(true);
const MenuDispatchContext = createContext(null);
const initialState = {
  opened: true,
  id: 0,
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
  switch (action.type) {
    case actions.TOGGLE_SIDE_DRAWER: {
      console.log(action.id);
      return {
        ...state,
        opened: !state.opened,
      };
    }
    case actions.OPEN_MENU: {
      return {
        ...state,
        id: action.id.id,
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
