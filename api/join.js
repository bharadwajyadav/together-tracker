const { assertConfig, db, code, input } = require('./_supabase');
const crypto = require('crypto');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  if (!assertConfig(res)) return;
  try {
    const { roomCode, displayName, userId } = input(req); const room = code(roomCode); const name = String(displayName || '').trim().slice(0, 32); const id = String(userId || crypto.randomUUID());
    if (room.length < 4 || !name) return res.status(400).json({error:'Use a 4+ character room code and a display name.'});
    await db('tracker_rooms?on_conflict=code', {method:'POST', headers:{Prefer:'resolution=ignore-duplicates'}, body:JSON.stringify({code:room})});
    await db('tracker_members?on_conflict=room_code,client_id', {method:'POST', headers:{Prefer:'resolution=merge-duplicates'}, body:JSON.stringify({room_code:room,client_id:id,display_name:name})});
    return res.status(200).json({userId:id, room:{code:room}});
  } catch (e) { return res.status(500).json({error:e.message}); }
};
