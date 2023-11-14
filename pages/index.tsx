// Home.tsx
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDropdown from '../components/CountryDropdown';
import { Country } from '../types'; // Adjust the path as necessary
import RootLayout from '@/components/layout/default';

const Home: NextPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError("");
    setIsLoading(true);
    axios.get('https://restcountries.com/v3.1/alpha?codes=us,no,tr,pe,fi')
      .then(response => {
        setCountries(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries.');
        setIsLoading(false);
      });
  }, []);

  const handleCountrySelect = (country: Country) => {
    setError("");
    setIsLoading(true)
    axios.get(`https://api.api-ninjas.com/v1/country?name=${country.name.common}`, {
      headers: {
        'X-Api-Key': 'UqygylAdC4p5SUoTBLE/4A==IPJhXLvjexQiLbhX' // Replace with your actual API key
      }
    })
      .then(response => {

        const Data: Country = {
          name: response.data[0].name,
          cca3: country.cca3,
          gdp: response.data[0].gdp,
          flags: country.flags
        }
        setSelectedCountry(Data);
        setIsLoading(false)

      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setError('Failed to load country GDP.');
        setIsLoading(false);
      });
  };

  return (
    <>
      <RootLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '50px',
          marginTop: '25%'
        }}>
          <div >
            <CountryDropdown countries={countries} onSelect={handleCountrySelect} loading={isLoading} />
          </div>
          <div style={{ width: "100px" }}>
            {
              selectedCountry && (
                <div>
                  <p style={{ fontWeight: 500 }}>{selectedCountry.gdp ? `$ ${new Intl.NumberFormat('en-US').format(selectedCountry.gdp)}` : 'N/A'}</p>
                </div>
              )
            }
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>

      </RootLayout>
    </>
  )
};

export default Home;
