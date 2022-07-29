import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { countryDetails, getCountriesData } from '../redux/CountriesSlice';
import './Home.css';
import Search from './Search';
import Hero from './Hero';
import Pagination from './Pagination';

const Home = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(21);

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getCountriesData());
  }, [dispatch]);

  const countryDetailsHandler = ({ target }) => {
    const { id } = target;
    dispatch(countryDetails(id));
  };

  const indexOfLastCounty = currentPage * countriesPerPage;
  const indexOfFirstCounty = indexOfLastCounty - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCounty,
    indexOfLastCounty
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  const filteredData = currentCountries.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Hero />
      <Search query={query} queryChangeHandler={queryHandler} />
      <ul className="wrap">
        {filteredData.map((country) => (
          <li key={country.name} className="country-card p-2">
            <Link to="/detail" className="name">
              <h5
                className="name py-2"
                id={country.name}
                onClick={countryDetailsHandler}
              >
                {country.name}
              </h5>
            </Link>
            <p className="population">{`Population : ${country.population}`}</p>
          </li>
        ))}
      </ul>
      <Pagination countriesPerPage={countriesPerPage} totalCountries={countries.length} paginate={paginate} />
    </>
  );
};

export default Home;
