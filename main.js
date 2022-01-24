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
