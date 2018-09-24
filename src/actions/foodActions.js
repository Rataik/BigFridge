// Custom data parser
// If we had separate data sources based on food types like meat, alcohol, cheese etc.
//  we could easily componentize this to meatParseData, cheeseParseData etc.
function parseFoodData(sectionIndex, sectionName, json) {
  return {
    index: sectionIndex,
    name: sectionName,
    items: json,
  };
}

export default parseFoodData;
