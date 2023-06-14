import { addNewLaunch, getAllLaunches } from '../../models/launches.model.js';

export function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

export function httpAddNewLaunch(req, res) {
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

  addNewLaunch(newLaunch);

  return res.status(201).json(newLaunch);
}
