export const fetchItems = () => {
  return $.ajax({
    method: "GET",
    url: `/api/companies/`, // needs to be updated 
  });
};

// searchButton.onclick = (e) => {
//   e.preventDefault();
//   let searchterm = searchVal.value;
//   searchterm = searchterm.split(' ').join('+');
//   const scraper = async () => {
//     try {
//       // might want to adjust url's end to only grab images of certain size 
//       const response = await fetch("https://www.googleapis.com/customsearch/v1?key=AIzaSyDKcs9-rwIbHeUhqhF4rYQZ4132i7bHkl4&cx=012673512427264311483:ortifcx9wgi&q=" + searchterm + "&searchType=image");
//       const json = await response.json();
//       showimage(json.items[0].link);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   showimage = function (url) {
//     let imageComponent = document.getElementById('testimg');
//     imageComponent.style.background = "url(" + url + ") no-repeat center fixed"
//     imageComponent.style.backgroundSize = "cover";
//   };
//   scraper();
// }
