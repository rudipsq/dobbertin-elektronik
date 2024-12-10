function generateNewJsonObject(_id, _name) {
  let jsonObject = {
    id: _id,
    name: _name,
  };

  return jsonObject;
}

function generateTemplateString(data) {
  const string = `${data.name}`;
  return string;
}
