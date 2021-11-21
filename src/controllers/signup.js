import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/connection.js";
import { signupSchema } from "../schemas/auth.js";

export default async function signup(req, res) {
	const validation = signupSchema.validate(req.body);
	if (validation.error) return res.sendStatus(400);

	const { name, email, password } = req.body;

	try {
		const duplicateEmailCheck = await connection.query("SELECT * FROM user WHERE email = $1;", [
			req.body.email,
		]);

		if (duplicateEmailCheck.rows.length !== 0) {
			return res.sendStatus(409);
		}

		const passwordHash = bcrypt.hashSync(password, 10);

		await connection.query("INSERT INTO user (name, email, password) VALUES ($1, $2, $3);", [
			name,
			email,
			passwordHash,
		]);

		return res.sendStatus(201);
	} catch (e) {
		console.log(err);
		return res.sendStatus(500);
	}
}
