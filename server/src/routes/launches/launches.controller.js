import {
  abortLaunchById,
  scheduleNewLaunch,
  existsLaunchWithId,
  getAllLaunches,
} from '../../models/launches.model.js';

import { getPagination } from '../../services/query.js';

export async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
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

export async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  // if launch does not exists
  const existLaunch = await existsLaunchWithId(launchId);
  if (!existLaunch) {
    return res.status(404).json({ error: 'Launch not found' });
  }

  // if launch does exist
  const abortedLaunch = await abortLaunchById(launchId);
  if (!abortedLaunch) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }
  return res.status(200).json({
    ok: true,
  });
}
