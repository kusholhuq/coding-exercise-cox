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
