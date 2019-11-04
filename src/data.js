const filterCountry = (data, country) => {
  return data.filter(dat => dat.Country.includes(country));
};

const filterGender = (data, gender) => {
  return data.filter(dat => dat.Genre.includes(gender));
};

window.filterCountry = filterCountry;
window.filterGenre = filterGender;