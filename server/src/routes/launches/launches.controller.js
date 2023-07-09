import {
  abortLaunchById,
  scheduleNewLaunch,
  existsLaunchWithId,
  getAllLaunches,
} from '../../models/launches.model.js';

export async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

export async function httpAddNewLaunch(req, res) {
  const newLaunch = req.body;

  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.target
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate);
  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({ error: 'Invalid launch date' });
  }

  await scheduleNewLaunch(newLaunch);

  return res.status(201).json(newLaunch);
}

export function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  // if launch does not exists
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: 'Launch not found' });
  }

  // if launch does exist
  const abortedLaunch = abortLaunchById(launchId);
  return res.status(200).json(abortedLaunch);
}
