const express = require('express');
const { getAllUser, createUser, updateUser , deleteUser,getUser,middleware, login,auth } = require('../controller/userController');
const router = express.Router();
const multer = require("../config/multer");
// router.get('/get', getAllUser);
router.post('/login', login);
// router.get('/get/:eid', getUser);
// router.post('/post', createUser);
// router.put('/put/:eid', updateUser);
// router.delete('/delete/:eid', deleteUser);
// const upload = require('../config/multer')

router.post('/register', multer.single('profile'), createUser);
router.route('/all').get(getAllUser).post(middleware,createUser);

router.route('/all/:eid').get(getUser).put(updateUser).delete(deleteUser);



// router.get('/get', getAllUser).post(createUser);

module.exports = router;

