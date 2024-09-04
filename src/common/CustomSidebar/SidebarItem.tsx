import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './styles.css';
import { RootState } from "../../redux/store";
import { SidebarItemProps } from "./interfaces";

const SidebarItem = ({ item }: SidebarItemProps) => {
  const { section: appState } = useSelector((state: RootState) => state.appState);

  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: "#1e293a"
          },
          backgroundColor: appState === item.state ? "#1e253a" : "unset",
          paddingY: "12px",
          paddingX: "24px"
        }}
      >
        <ListItemIcon className="customSidebar__item_icon">
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;