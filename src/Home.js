import React from 'react'
import LandingPage from './Components/Landing-page/LandingPage'
import MediaCard from './Components/Cards/MediaCard'
import Header from './Components/NavBar/Header'
import Footer from './Components/NavBar/Footer'
import InfosCard from './Components/Cards/InfosCard'
import PartnerCarousel from './Components/Carousel/PartnerCarousel'

function Home() {
  return (
    <div>
      <Header />
      <div>
        <LandingPage />
      </div>
      <div>
        <InfosCard
          imgsrc={"https://cdn.pixabay.com/photo/2019/09/23/12/47/airsoft-4498480_1280.jpg"}
          title="Qui sommes nous ?"
          paragraph="Neversoft est un jeune club d'airsoft né en février 2024, rassemblant une équipe de cinq joueurs passionnés, dont trois également investis dans l'administration. Nous organisons des parties conviviales chaque dimanche matin, au cœur des bois, dans une ambiance décontractée et sans pression. Notre objectif est de partager notre passion pour l'airsoft dans un cadre chill, où stratégie, fair-play et camaraderie sont au rendez-vous. Que vous soyez novice ou expérimenté, Neversoft vous accueille pour découvrir ou redécouvrir le plaisir de jouer ensemble !"
        />
      </div>
      <div className='cards'>
        <div>
          <MediaCard 
            imgsrc={"https://cdn.pixabay.com/photo/2018/10/15/15/39/airsoft-3749268_1280.jpg"} 
            title="L'airsoft" 
            paragraph="L'airsoft, un sport de stratégie où les passionnés s'affrontent avec des répliques réalistes tirant des billes de 6mm pour une immersion totale !"
            textBtn="Lire +"
            link="https://air-soft.gun-evasion.com/blog/definition-airsoft-10-points/"
          />
        </div>
        <div>
          <MediaCard 
            imgsrc={"https://cdn.pixabay.com/photo/2021/12/06/19/32/paintball-6851399_960_720.jpg"} 
            title="La sécurité" 
            paragraph="La sécurité est essentielle en airsoft : lunettes de protection, règles strictes et respect des distances garantissent une expérience sûre pour tous les joueurs."
            textBtn="Lire +"
            link="https://air-soft.gun-evasion.com/blog/definition-airsoft-10-points/"
          />
        </div>
      </div>
      <div>
        <PartnerCarousel />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home