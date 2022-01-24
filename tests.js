const chai = window.chai;
const expect = chai.expect;
const assert = chai.assert;

const sampleData = {
  id: { datasetId: 'JM9QlVje2Qg' },
  vehicles: {
    vehicleIds: [
      1987971375,
      1523499986,
      1356017876,
      849168205,
      245939330,
      1051737701,
      142106180,
      1866164693,
      1064653107
    ]
  },
  vehicleInfo: [
    { vehicleId: 1987971375, year: 2014, make: 'Ford', model: 'F150', dealerId: 859315052 },
    { vehicleId: 1523499986, year: 2012, make: 'Nissan', model: 'Altima', dealerId: 1973699046 },
    { vehicleId: 1356017876, year: 2016, make: 'Bentley', model: 'Mulsanne', dealerId: 1973699046 },
    { vehicleId: 849168205, year: 2009, make: 'Ford', model: 'F150', dealerId: 1519245764 },
    { vehicleId: 245939330, year: 2016, make: 'Kia', model: 'Soul', dealerId: 859315052 },
    { vehicleId: 1051737701, year: 2013, make: 'Mitsubishi', model: 'Gallant', dealerId: 859315052 },
    { vehicleId: 142106180, year: 2016, make: 'Honda', model: 'Accord', dealerId: 1519245764 },
    { vehicleId: 1866164693, year: 1979, make: 'Cheverolet', model: 'Corvette', dealerId: 1973699046 },
    { vehicleId: 1064653107, year: 2004, make: 'MINI', model: 'Cooper', dealerId: 1519245764 },
  ],
  uniqueDealers: {
    859315052: [
      { vehicleId: 849168205, year: 2009, make: 'Ford', model: 'F150' },
      { vehicleId: 245939330, year: 2016, make: 'Kia', model: 'Soul' },
      { vehicleId: 1051737701, year: 2013, make: 'Mitsubishi', model: 'Gallant' }
    ],
    1519245764: [
      { vehicleId: 1987971375, year: 2014, make: 'Ford', model: 'F150' },
      { vehicleId: 142106180, year: 2016, make: 'Honda', model: 'Accord' },
      { vehicleId: 1064653107, year: 2004, make: 'MINI', model: 'Cooper' }
    ],
    1973699046: [
      { vehicleId: 1523499986, year: 2012, make: 'Nissan', model: 'Altima' },
      { vehicleId: 1356017876, year: 2016, make: 'Bentley', model: 'Mulsanne' },
      { vehicleId: 1866164693, year: 1979, make: 'Cheverolet', model: 'Corvette' }
    ]
  },
  dealersInfo: [
    { dealerId: 859315052, name: 'House of Wheels' },
    { dealerId: 1519245764, name: "Bob's Cars" },
    { dealerId: 1973699046, name: "Doug's Doozies" }
  ],
  answer: {
    dealers: [
      {
        dealerId: 859315052,
        name: 'House of Wheels',
        vehicles: [
          { vehicleId: 849168205, year: 2009, make: 'Ford', model: 'F150' },
          { vehicleId: 245939330, year: 2016, make: 'Kia', model: 'Soul' },
          { vehicleId: 1051737701, year: 2013, make: 'Mitsubishi', model: 'Gallant' }
        ]
      },
      {
        dealerId: 1519245764,
        name: "Bob's Cars",
        vehicles: [
          { vehicleId: 1987971375, year: 2014, make: 'Ford', model: 'F150' },
          { vehicleId: 142106180, year: 2016, make: 'Honda', model: 'Accord' },
          { vehicleId: 1064653107, year: 2004, make: 'MINI', model: 'Cooper' }
        ]
      },
      {
        dealerId: 1973699046,
        name: "Doug's Doozies",
        vehicles: [
          { vehicleId: 1523499986, year: 2012, make: 'Nissan', model: 'Altima' },
          { vehicleId: 1356017876, year: 2016, make: 'Bentley', model: 'Mulsanne' },
          { vehicleId: 1866164693, year: 1979, make: 'Cheverolet', model: 'Corvette' }
        ]
      }
    ]
  },
  postResponse: { success: true, message: 'Congratulations.', totalMilliseconds: 12500 }
}

describe('getDatasetId', function () {
  this.timeout(15000);
  it('should return an object', async () => {
    const result = await getDatasetId();
    assert.typeOf(result, 'Object');
  })
  it('should return an object with property datasetId', async () => {
    const result = await getDatasetId();
    assert.property(result, 'datasetId');
  })
  it('should return an object with property datasetId with a string value', async () => {
    const result = await getDatasetId();
    assert.typeOf(result.datasetId, 'string');
  })
})

describe('getVehicles', function () {
  this.timeout(15000);
  it('should return an object', async () => {
    const vehicles = await getVehicles(sampleData.id.datasetId);
    assert.typeOf(vehicles, 'Object');
  })
  it('should return an object with property vehicleIds', async () => {
    const vehicles = await getVehicles(sampleData.id.datasetId);
    assert.property(vehicles, 'vehicleIds');

  })
  it('should return an object with property vehicleIds containing an array', async () => {
    const vehicles = await getVehicles(sampleData.id.datasetId);
    assert(Array.isArray(vehicles.vehicleIds));
  })
})

describe('getVehicleInfo', function () {
  this.timeout(15000);
  it('should return an array', async () => {
    const vehicleInfo = await getVehicleInfo(sampleData.id.datasetId, sampleData.vehicles.vehicleIds);
    assert.typeOf(vehicleInfo, 'Array');
  })
  it('should return one array item for every id in vehicleIds', async () => {
    const vehicleInfo = await getVehicleInfo(sampleData.id.datasetId, sampleData.vehicles.vehicleIds);
    assert.equal(vehicleInfo.length, sampleData.vehicles.vehicleIds.length);

  })
  it('each array item should be an object', async () => {
    const vehicleInfo = await getVehicleInfo(sampleData.id.datasetId, sampleData.vehicles.vehicleIds);
    for (let i = 0; i < vehicleInfo.length; i++) {
      assert.typeOf(vehicleInfo[i], 'object');
    }
  })
})
