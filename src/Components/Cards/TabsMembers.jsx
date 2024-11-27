import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UsersTab from '../Table/UsersTab'
import TocIcon from '@mui/icons-material/Toc';
import ContactsIcon from '@mui/icons-material/Contacts';
import GamesIcon from '@mui/icons-material/Games';
import WhoWeAre from './WhoWeAre';
import GamesCard from './GamesCard';

function TabsMembers() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <Box sx={{ width: '100%', typography: 'body1', marginTop: 5 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{fontSize: '15px',textTransform: 'capitalize' }} icon={<ContactsIcon />} iconPosition="start" label="Qui sommes nous ?" value="1"/>
            <Tab sx={{fontSize: '15px',textTransform: 'capitalize' }} icon={<GamesIcon />} iconPosition="start" label="Nos modes de jeux" value="2"/>
            <Tab sx={{fontSize: '15px',textTransform: 'capitalize'}} icon={<TocIcon />} iconPosition="start" label="Tableau des membres" value="3" />
          </TabList>
        </Box>
          <TabPanel value="1" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            <WhoWeAre />
          </TabPanel>
          <TabPanel  value="2">
            <GamesCard />
          </TabPanel>
          <TabPanel value="3">
            <UsersTab />
          </TabPanel>
      </TabContext>
    </Box>
  )
}

export default TabsMembers
