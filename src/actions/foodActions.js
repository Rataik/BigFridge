// Custom data parser
// If we had separate data sources based on food types like meat, alcohol, cheese etc.
//  we could easily componentize this to meatParseData, cheeseParseData etc.
export function parseFoodData(index, name, section, json) {
  return {
    index,
    name,
    section,
    items: json
  }
}