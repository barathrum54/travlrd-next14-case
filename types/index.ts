export interface Country {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  gdp?: number;
}
export interface CountryDropdownProps {
  countries: Country[];
  onSelect: (country: Country) => void;
}
