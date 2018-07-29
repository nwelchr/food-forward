export const fetchItems = () => {
  return $.ajax({
    method: "GET",
    url: `/api/companies/`, // needs to be updated 
  });
};
