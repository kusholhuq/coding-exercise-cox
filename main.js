const url = 'http://api.coxauto-interview.com/api';
const buttonRef = document.querySelector('#button');

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

function determineUniqueDealers(vehicleInfoArray) {
  const vehiclesByDealer = {};

  for (let i = 0; i < vehicleInfoArray.length; i++) {
    const dealerIdTemp = vehicleInfoArray[i].dealerId;
    const vehicleInfo = vehicleInfoArray[i];
    if (!vehiclesByDealer[dealerIdTemp]) {
      vehiclesByDealer[dealerIdTemp] = [];
      delete vehicleInfo.dealerId;
      vehiclesByDealer[dealerIdTemp].push(vehicleInfo);
    } else {
      delete vehicleInfo.dealerId;
      vehiclesByDealer[dealerIdTemp].push(vehicleInfo);
    }
  }
  return vehiclesByDealer;
}

async function getDealers(id, dealerIds) {
  try {
    const fetches = [];
    for (const dealer in dealerIds) {
      let oneFetchCall = fetch(`${url}/${id}/dealers/${dealer}`)
        .then(responseDealerInfo => responseDealerInfo.json())
      fetches.push(oneFetchCall);
    }
    let results = await Promise.all(fetches);
    return results;
  } catch (err) {
    console.error(err);
  }
}

function formatAnswer(dealersInfo, dealersCars) {
  for (let i = 0; i < dealersInfo.length; i++) {
    const dealerId = dealersInfo[i].dealerId;
    dealersInfo[i].vehicles = dealersCars[dealerId];
  }
  return { dealers: dealersInfo };
}

async function postAnswer(id, answer) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(answer),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const responsePost = await fetch(`${url}/${id}/answer`, options);
    const dataPost = await responsePost.json();
    return dataPost;
  } catch (err) {
    console.error(err);
  }
}

function updateDom(json) {
  const messageHolder = document.querySelector("#message");
  const successHolder = document.querySelector("#success");
  const timeHolder = document.querySelector("#time");
  const success = `Success: ${json.success}`;
  const message = `Message: ${json.message}`;
  const time = `Time: ${json.totalMilliseconds} milliseconds`;
  messageHolder.textContent = message;
  successHolder.textContent = success;
  timeHolder.textContent = time;
  buttonRef.classList.remove('hidden');
}

async function app() {
  const id = await getDatasetId();
  const vehicles = await getVehicles(id.datasetId);
  const vehicleInfo = await getVehicleInfo(id.datasetId, vehicles.vehicleIds);
  const uniqueDealers = determineUniqueDealers(vehicleInfo);
  const dealersInfo = await getDealers(id.datasetId, uniqueDealers);
  const answer = formatAnswer(dealersInfo, uniqueDealers);
  const postResponse = await postAnswer(id.datasetId, answer);
  updateDom(postResponse);
}

function againHandler() {
  app();
  buttonRef.classList.add('hidden');
  const messageHolder = document.querySelector("#message");
  const successHolder = document.querySelector("#success");
  const timeHolder = document.querySelector("#time");
  messageHolder.textContent = '';
  successHolder.textContent = 'Loading...';
  timeHolder.textContent = '';
}

buttonRef.addEventListener('click', againHandler);

app();
