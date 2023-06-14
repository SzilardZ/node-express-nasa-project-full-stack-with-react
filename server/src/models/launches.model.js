const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27 2030'),
  target: 'Kepler-442b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

const launch2 = {
  flightNumber: 200,
  mission: 'Kepler Exploration XXX',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 27 2031'),
  target: 'Kepler-443b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
launches.set(launch2.flightNumber, launch2);

export function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      cusotmers: ['ZTM', 'NASA'],
      upcoming: true,
      success: true,
    })
  );
}

export function getAllLaunches() {
  return Array.from(launches.values());
}
