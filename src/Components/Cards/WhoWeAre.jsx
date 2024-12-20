import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const members = [
  {
    id: 1,
    photo:
      "https://cdn.pixabay.com/photo/2019/11/26/07/12/veterans-day-4653833_1280.jpg",
    grade: "Président",
    nom: "Fallon",
    prenom: "Florentin",
    role: "Admin",
  },
  {
    id: 2,
    photo: "https://cdn.pixabay.com/photo/2015/03/11/20/49/asg-669194_1280.jpg",
    grade: "Vice-Président",
    nom: "Coutant",
    prenom: "Mathias",
    role: "Vice-Président",
  },
  {
    id: 3,
    photo:
      "https://cdn.pixabay.com/photo/2016/03/27/07/38/police-1282330_1280.jpg",
    grade: "Trésoriere",
    nom: "Coutant",
    prenom: "Laura",
    role: "Trésoriere",
  },
  {
    id: 4,
    photo:
      "https://cdn.pixabay.com/photo/2019/08/23/13/33/militaria-4425732_960_720.jpg",
    grade: "Joueur",
    nom: "Coutant",
    prenom: "Geoffrey",
    role: "Swifteur",
  },
  {
    id: 5,
    photo:
      "https://cdn.pixabay.com/photo/2012/10/10/17/03/soldiers-60714_1280.jpg",
    grade: "Joueur",
    nom: "Boizot",
    prenom: "Maxime",
    role: "Swifteur",
  },
  {
    id: 6,
    photo:
      "https://cdn.pixabay.com/photo/2017/08/25/07/17/soldiers-2679303_1280.jpg",
    grade: "Joueur",
    nom: "Fallon",
    prenom: "Romain",
    role: "Swifteur",
  },
];

const WhoWeAre = () => {
  return (
    <div>
      <Grid container spacing={4} justifyContent="center">
        {members.map((member) => (
          <Grid item key={member.id} xs={12} md={4}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.5s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(99, 97, 97, 0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: { xs: 150, md: 150, lg: 150 } }}
                image={member.photo}
                alt={`${member.prenom} ${member.nom}`}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    textAlign: "center",
                  }}
                >
                  {member.prenom} {member.nom}
                  {member.role && (
                    <span
                      style={{
                        backgroundColor:
                          member.role === "Admin"
                            ? "#ff5252"
                            : member.role === "Swifteur"
                              ? "#ffa726"
                              : member.role === "Vice-Président"
                                ? "#0d47a1"
                                : member.role === "Trésoriere"
                                  ? "#f06292"
                                  : "#e0e0e0",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "0.6rem",
                      }}
                    >
                      {member.role}
                    </span>
                  )}
                </Typography>
                <Typography variant="body2" color="#728996">
                  {member.grade}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WhoWeAre;
