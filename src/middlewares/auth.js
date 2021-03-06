/* eslint-disable consistent-return */
import connection from '../database/connection.js';

export default async function auth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  try {
    const session = await connection.query(
      'SELECT * FROM session WHERE token = $1;',
      [token],
    );

    if (session.rows.length === 0) {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}
