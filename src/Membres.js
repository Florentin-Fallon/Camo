import React from 'react'
import Header from './Components/NavBar/Header'
import Footer from './Components/NavBar/Footer'
import Box from '@mui/material/Box'
import TabsMembers from './Components/Cards/TabsMembers'
import ReseauxCard from './Components/Cards/ReseauxCard'

function Membres() {
  return (
    <Box >
      <Header />
      <Box>
        <ReseauxCard />
      </Box>
      <div className='tabs'>
        <TabsMembers />
      </div>
      <Footer />
    </Box>
  )
}

export default Membres
