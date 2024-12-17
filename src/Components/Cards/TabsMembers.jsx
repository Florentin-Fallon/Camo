import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UsersTab from "../Table/UsersTab";
import TocIcon from "@mui/icons-material/Toc";
import ContactsIcon from "@mui/icons-material/Contacts";
import GamesIcon from "@mui/icons-material/Games";
import GroupsIcon from "@mui/icons-material/Groups";
import WhoWeAre from "./WhoWeAre";
import GamesCard from "./GamesCard";
import ReseauxCard from "./ReseauxCard";

function TabsMembers() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "180%", typography: "body1", marginTop: 3 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "& .MuiTab-root": {
                fontSize: "13px",
                minWidth: "auto",
                textTransform: "capitalize",
              },
              "@media (min-width:600px)": {
                "& .MuiTab-root": {
                  fontSize: "15px",
                },
              },
            }}
          >
            <Tab
              icon={<ContactsIcon />}
              iconPosition="start"
              label="L'équipe"
              value="1"
            />
            <Tab
              icon={<GroupsIcon />}
              iconPosition="start"
              label="Nos réseaux"
              value="2"
            />
            <Tab
              icon={<GamesIcon />}
              iconPosition="start"
              label="Nos modes de jeux"
              value="3"
            />
            <Tab
              icon={<TocIcon />}
              iconPosition="start"
              label="Tableau des membres"
              value="4"
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            padding: { xs: 2, sm: 3 },
          }}
        >
          <WhoWeAre />
        </TabPanel>
        <TabPanel value="2">
          <ReseauxCard
            title="Instagram"
            description="Suivez-nous pour découvrir nos aventures en photo."
            image="https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            link="https://www.instagram.com/club_neversoft/"
            buttonText="Rejoignez-nous"
            bgColor="#1e1e2f"
          />
          <ReseauxCard
            title="Discord"
            description="Rejoignez notre serveur et échangez avec nous."
            image="https://images.unsplash.com/photo-1614680376739-414d95ff43df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            link="https://discord.com/invite/votre_invitation"
            buttonText="Rejoindre le serveur"
            bgColor="#1e1e2f"
          />
        </TabPanel>
        <TabPanel value="3">
          <GamesCard />
        </TabPanel>
        <TabPanel value="4">
          <UsersTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabsMembers;
