import Event from '../models/Event.js';

function isValidDate(value) {
  return !Number.isNaN(new Date(value).getTime());
}

export async function createEvent(req, res) {
  try {
    const { session_id, event_type, page_url, timestamp, x, y } = req.body;

    if (!session_id || !event_type || !page_url || !timestamp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!['page_view', 'click'].includes(event_type)) {
      return res.status(400).json({ message: 'Invalid event_type' });
    }
    if (!isValidDate(timestamp)) {
      return res.status(400).json({ message: 'Invalid timestamp' });
    }

    const event = await Event.create({
      session_id,
      event_type,
      page_url,
      timestamp: new Date(timestamp),
      x: event_type === 'click' ? x ?? null : null,
      y: event_type === 'click' ? y ?? null : null
    });

    res.status(201).json({ message: 'Event stored', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getSessions(req, res) {
  try {
    const sessions = await Event.aggregate([
      { $group: { _id: '$session_id', event_count: { $sum: 1 }, first_seen: { $min: '$timestamp' }, last_seen: { $max: '$timestamp' } } },
      { $sort: { last_seen: -1 } },
      { $project: { _id: 0, session_id: '$_id', event_count: 1, first_seen: 1, last_seen: 1 } }
    ]);

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getSessionEvents(req, res) {
  try {
    const { sessionId } = req.params;
    const events = await Event.find({ session_id: sessionId }).sort({ timestamp: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getHeatmap(req, res) {
  try {
    const { pageUrl } = req.query;
    if (!pageUrl) {
      return res.status(400).json({ message: 'pageUrl query param is required' });
    }

    const clicks = await Event.find({ page_url: pageUrl, event_type: 'click' })
      .sort({ timestamp: 1 })
      .select('x y timestamp session_id page_url -_id');

    res.json({ pageUrl, clicks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
