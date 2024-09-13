const express = require('express');
const { getCurrentUser, updateUser } = require('../controllers/user');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
	const user = await getCurrentUser(req.user.id);

	if (!user) {
		return res.status(404).send({ message: 'User not found' });
	}

	res.send({ data: mapUser(user) });
});

router.patch('/:id', authenticated, async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	res.send({ data: mapUser(newUser) });
});

module.exports = router;
