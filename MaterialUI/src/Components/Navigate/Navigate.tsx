import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import { NavLink } from 'react-router-dom';

import "./Navigate.css";

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

const navItems: NavItem[] = [
  { text: 'Назад', path: '/', icon: <InboxIcon /> },
  { text: 'Starred', path: '/starred', icon: <MailIcon /> },
  { text: 'Send email', path: '/email', icon: <MailIcon /> },
  { text: 'Drafts', path: '/drafts', icon: <MailIcon /> },
  { text: 'All 123', path: '/all', icon: <MailIcon /> },
  { text: 'Trash', path: '/trash', icon: <MailIcon /> },
  { text: 'Spam', path: '/spam', icon: <MailIcon /> },
];

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map(({ text, path, icon }, index) => (
          <ListItem key={text} disablePadding>
            <NavLink to={path} style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#1976d2' : 'inherit',
              backgroundColor: isActive ? '#e8f5fe' : 'transparent',
              padding: '8px 16px',
              display: 'block',
            })}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button className='Navigate__Btn' onClick={toggleDrawer(true)}>Открыть меню</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
