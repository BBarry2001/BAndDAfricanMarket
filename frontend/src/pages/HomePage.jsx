import Header from '../components/header';
import TopPicksProducts from '../components/TopPicksProducts';
import CompanyBenefitsTags from'../components/CompanyBenefitsTags';
import SpecialCompanyStaticOffers from'../components/SpecialCompanyStaticOffers';
import TheFooter from '../components/Footer';
import HomePageStyles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={HomePageStyles.HomePage} >
      <Header showCarousel={true} />
      <TopPicksProducts />
      <CompanyBenefitsTags />
      <SpecialCompanyStaticOffers />
      <TheFooter />
    </div>

  );
}

export default HomePage;
