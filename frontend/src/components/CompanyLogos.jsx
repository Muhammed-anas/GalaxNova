import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={logo} alt={logo}
            className="w-8 sm:w-10 md:w-12 lg:w-14"
             />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
