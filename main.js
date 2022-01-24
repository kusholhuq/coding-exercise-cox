const url = 'http://api.coxauto-interview.com/api';


async function getDatasetId() {
  try {
    const responseId = await fetch(`${url}/datasetId`);
    const dataId = await responseId.json();
    return dataId;
  } catch (err) {
    console.error(err);
  }
}

async function getVehicles(id) {
  try {
    const responseVehicles = await fetch(`${url}/${id}/vehicles`);
    const dataVehicles = await responseVehicles.json();
    return dataVehicles;
  } catch (err) {
    console.error(err);
  }
}

async function getVehicleInfo(id, vehicles) {
  try {
    const fetches = [];
    for (let i = 0; i < vehicles.length; i++) {
      let oneFetchCall = fetch(`${url}/${id}/vehicles/${vehicles[i]}`)
        .then(responseVehicleInfo => responseVehicleInfo.json())
      fetches.push(oneFetchCall);
    }
    let results = await Promise.all(fetches);
    return results;
  } catch (err) {
    console.error(err);
  }
}
