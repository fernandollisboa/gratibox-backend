import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/connection.js";
import { loginSchema } from "../schemas/auth.js";

export default async function login(req, res) {
	const validation = loginSchema.validate(req.body);
	if (validation.error) return res.sendStatus(400);

	const { email, password } = req.body;

	try {
		const emailExistsCheck = await connection.query("SELECT * FROM user WHERE email = $1;", [
			email,
		]);

		if (emailExistsCheck.rows.length === 0) return res.sendStatus(404);

		const user = emailExistsCheck.rows[0];

		if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(403);
		delete user.password;

		const token = uuid();

		const session = await connection.query(`SELECT * FROM session WHERE "userId" = $1;`, [user.id]);

		if (session.rows.length === 0) {
			await connection.query(`INSERT INTO session (user_id,token) VALUES ($1,$2);`, [
				user.id,
				token,
			]);
		} else {
			await connection.query(`UPDATE session SET token = $1 WHERE user_id = $2;`, [token, user.id]);
		}

		const name = emailExistsCheck.rows[0].name;
		const id = emailExistsCheck.rows[0].id;

		// const {name,id } = emailExistsCheck.rows[0];

		return res.send({ name, id, token }).status(200);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}
