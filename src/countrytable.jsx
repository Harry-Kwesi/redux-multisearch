import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountryData, setCountryFilters } from "./actions";

export default function Countrytable() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const data = useSelector((state) => state.data);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error on my path");
    }
  }

  useEffect(() => {
    fetchData().then((data) => {
      dispatch(setCountryData(data));
    });
  }, [dispatch]);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    dispatch(setCountryFilters({ ...filters, [name]: value }));
  }

  const filteredData = data.filter((item) => {
    const {
      name: { common },
      capital: [firstCapital],
      region,
      subregion,
    } = item;
    // Check if each criterion matches the corresponding filter value
    return (
      common.toLowerCase().includes(filters.country.toLowerCase()) &&
      (firstCapital
        ? firstCapital.toLowerCase().includes(filters.capital.toLowerCase())
        : false) &&
      region.toLowerCase().includes(filters.region.toLowerCase()) &&
      subregion.toLowerCase().includes(filters.subregion.toLowerCase())
    );
  });

  return (
    <>
      <input
        type="text"
        name="country"
        placeholder="Filter by Country Name"
        value={filters.country}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="capital"
        placeholder="Filter by Capital"
        value={filters.capital}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="region"
        placeholder="Filter by Region"
        value={filters.region}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="subregion"
        placeholder="Filter by Subregion"
        value={filters.subregion}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Subregion</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            const {
              name: { common },
              capital: [firstCapital],
              region,
              subregion,
              latlng: [latitude, longitude],
            } = item;

            // Format latitude and longitude to have 2 decimal places
            const formattedLatitude = parseFloat(latitude).toFixed(2);
            const formattedLongitude = parseFloat(longitude).toFixed(2);
            return (
              <tr key={index}>
                <td>{common}</td>
                <td>{firstCapital}</td>
                <td>{region}</td>
                <td>{subregion}</td>
                <td>{formattedLatitude}</td>
                <td>{formattedLongitude}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
