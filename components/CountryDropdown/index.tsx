import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Country } from '../../types';
import styles from './index.module.scss';
import Image from 'next/image';

interface CustomDropdownProps {
  countries: Country[];
  onSelect: (country: Country) => void;
  loading: boolean;

}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ countries, onSelect, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    onSelect(country);
    setIsOpen(false);
  };
  const handleHeaderClick = () => {
    if (!loading) {
      setIsOpen(!isOpen);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={`${styles.dropdownHeader} ${loading ? styles.disabled : ''}`} onClick={handleHeaderClick}>
        {selectedCountry ?
          <span>
            <Image
              src={selectedCountry.flags.png}
              alt={`${selectedCountry.name.common} flag`}
              width={20}
              height={15}
              layout="fixed"
              className={styles.flag}
            />
            {selectedCountry.name.common}
          </span>

          : <span>Select a country</span>}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className={styles.chevron} />
      </div>
      {isOpen && !loading && (
        <div className={styles.dropdownList}>
          {countries.map(country => (
            <div
              key={country.cca3}
              className={styles.dropdownItem}
              onClick={() => handleSelect(country)}
            >
              <Image
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                width={20}
                height={15}
                layout="fixed"
                className={styles.flag}
              />
              {country.name.common}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
