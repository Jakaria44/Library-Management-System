import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { VariableSizeList } from "react-window";
import server from "./../HTTP/httpCommonParam";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {/* {`#${dataSet[2] + 1} - ${dataSet[1]}`} */}
      {` ${dataSet[1]}`}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
export const ListboxComponent = React.forwardRef(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
      noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
      if (child.hasOwnProperty("group")) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  }
);

export const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export default function AuthorInput({
  setAuthor = null,
  value = "",

  ...props
}) {
  const [authors, setAuthors] = React.useState([]);
  React.useEffect(() => {
    loadAllAuthors();
  }, []);

  const loadAllAuthors = async () => {
    server
      .get("/getAuthor")
      .then((response) => {
        setAuthors(response.data.map((option) => option));
      })
      .catch((err) => {
        setAuthors([]);
        console.log(err);
      });
  };
  const OPTIONS = React.useMemo(() => authors.map((item) => item), [authors]);

  return (
    <Autocomplete
      id="virtualize-demo"
      disableListWrap
      autoHighlight
      getOptionLabel={(option) => option.NAME}
      value={OPTIONS.filter((option) => option.AUTHOR_ID === props.value)[0]}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={OPTIONS}
      onChange={(event, newValue) => {
        console.log(newValue);
        if (setAuthor !== null)
          setAuthor((prev) => ({ ...prev, AUTHOR_ID: newValue.AUTHOR_ID }));
      }}
      // groupBy={(option) => option[0].toUpperCase()}
      renderInput={(params) => (
        <TextField label="Add Author" placeholder="Add Author" {...params} />
      )}
      renderOption={(props, option, state) => [props, option.NAME, state.index]}
      // TODO: Post React 18 update - validate this conversion, look like a hidden bug
      renderGroup={(params) => params}
      isOptionEqualToValue={(option, value) =>
        option.AUTHOR_ID === value.AUTHOR_ID
      }
    />
  );
}
