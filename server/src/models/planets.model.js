import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';

import planets from './planets.mongo.js';

function isHabitablePlanet(planet) {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}

export async function loadPlanetsData() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  try {
    const response = fs
      .createReadStream(
        path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
      )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async data => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', err => {
        console.log(err);
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
      });
    if (!response)
      throw new Error(`Couldn't fetch the data. Please try again later!`);
  } catch (err) {
    console.log(err.message);
  }
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save the palnet ${err}`);
  }
}

export async function getAllPlanets() {
  return await planets.find({});
}
