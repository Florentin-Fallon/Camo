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
          imgsrc={"https://images.unsplash.com/photo-1599078006701-a8984b48be25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          title="Qui sommes nous ?"
          paragraph="Neversoft est un jeune club d'airsoft né en février 2024, rassemblant une équipe de cinq joueurs passionnés, dont trois également investis dans l'administration. Nous organisons des parties conviviales chaque dimanche matin, au cœur des bois, dans une ambiance décontractée et sans pression. Notre objectif est de partager notre passion pour l'airsoft dans un cadre chill, où stratégie, fair-play et camaraderie sont au rendez-vous. Que vous soyez novice ou expérimenté, Neversoft vous accueille pour découvrir ou redécouvrir le plaisir de jouer ensemble !"
        />
      </div>
      <div className='cards'>
        <div>
          <MediaCard 
            imgsrc={"https://images.unsplash.com/photo-1661339050670-854b9d4fd087?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
            title="L'airsoft" 
            paragraph="L'airsoft, un sport de stratégie où les passionnés s'affrontent avec des répliques réalistes tirant des billes de 6mm pour une immersion totale !"
            textBtn="Lire +"
            link="https://air-soft.gun-evasion.com/blog/definition-airsoft-10-points/"
          />
        </div>
        <div>
          <MediaCard 
            imgsrc={"https://images.unsplash.com/photo-1710756396097-9a4fc4acc695?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
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