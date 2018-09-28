const parseDateTime = (dateTimeColumns, items) => {
  const dateTimeKeys = dateTimeColumns.join('|').toLowerCase().split('|');
  return items.map((item) => {
    const newItem = {};

    Object.entries(item).forEach(([key, value]) => {
      if (dateTimeKeys.includes(key.toLowerCase())) {
        newItem[key] = new Date(value);
      } else {
        newItem[key] = value;
      }
    });

    return newItem;
  });
};

// Custom data parser
// If we had separate data sources based on food types like meat, alcohol, cheese etc.
//  we could easily componentize this to meatParseData, cheeseParseData etc.
function parseFoodData(columnsOfTypeDateTime, json) {
  let items = json;
  if (columnsOfTypeDateTime.length !== 0) {
    items = parseDateTime(columnsOfTypeDateTime, json);
  }

  return {
    items,
  };
}

export default parseFoodData;
