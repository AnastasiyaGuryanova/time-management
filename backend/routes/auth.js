const express = require('express');
const mapUser = require('../helpers/mapUser');
const { register, login } = require('../controllers/user');

const router = express.Router({ mergeParams: true });

router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(
			req.body.name,
			req.body.email,
			req.body.password
		);

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
			res.status(409).send({ error: 'Пользователь с таким email уже существует.' });
		} else {
			res.status(500).send({
				error: 'Произошла ошибка при регистрации пользователя.',
			});
		}
	}
});

router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
			res.status(409).send({ error: 'Пользователь с таким email уже существует.' });
		} else {
			res.status(500).send({
				error: 'Произошла ошибка при регистрации пользователя.',
			});
		}
	}
});

router.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
