import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

export function RenderRow(props) {
  const { index, style, handleItemClick } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={() => handleItemClick(`Item ${index + 1}`)}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const renderRow = (props) => <RenderRow {...props} handleItemClick={handleItemClick} />;

  const handleAddClick = () => {
    // Do something with the selected items
    console.log("Selected Items:", selectedItems);
  };

  return (
    <Box
      sx={{
        width: 400,
        height: 125,
        maxWidth: 800,
        bgcolor: "secondary.light",
        marginLeft: "42%",
        color: "primary.main",
      }}
    >
      <FixedSizeList
        height={125}
        width={400}
        itemSize={40}
        itemCount={50}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
      <button onClick={handleAddClick}>Add Selected Items</button>
    </Box>
  );
}
