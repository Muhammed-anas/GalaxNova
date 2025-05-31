import ButtonGradient from "./assets/svg/ButtonGradient";
import Button from "./components/Button";
import Collabration from "./components/Collabration";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import Benefits from "./components/benefits";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collabration />
        <Services />
        <Pricing />
      </div>
      <ButtonGradient />
    </>
  );
};
export default App;
