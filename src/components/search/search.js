import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOption = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    const handleOnChange = (search) => {
        setSearch(search);
        onSearchChange(search);
    }

    return (
        <AsyncPaginate
            placeholder='Search for city'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOption}
        />
    )
}

export default Search;