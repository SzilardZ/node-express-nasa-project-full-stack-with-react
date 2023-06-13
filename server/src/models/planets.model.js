import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';

export const habitablePlanets = [];

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
      .on('data', data => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', err => {
        console.log(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
      });
    if (!response)
      throw new Error(`Couldn't fetch the data. Please try again later!`);
  } catch (err) {
    console.log(err.message);
  }
}

export function getAllPlanets() {
  return habitablePlanets;
}
