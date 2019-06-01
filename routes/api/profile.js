const express = require('express');
const router = express.Router();
const passport = require('passport');

//------------ Collection ----------------

const User = require('../../models/User')

// --------------------------------------


// @route       GET api/profile/:userName
// @desc        Get the profile data of the params passed
// @access      Private
router.get('/:userName', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    User.findOne({username: req.params.userName})
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

// @route       GET api/profile/
// @desc        Get the profile data of self
// @access      Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    User.findById(req.user.id)
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

// @route       POST api/profile/follow/:userId
// @desc        Follow the user
// @access      Private
router.post('/follow/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
    var pre_username;
    var preusername;
    var preprofileURL;
    User.findById(req.params.userId)
        .then(user => {
            if (user.followers.filter(follower => follower._username.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyFollowed: 'User already follow this user' })
            }
            //stroning
            pre_username = user._id;
            preusername = user.username;
            preprofileURL = user.profileURL

            //Add user id to likes array
            user.followers.unshift({ _username: req.user.id , username: req.user.username, profileURL: req.user.profileURL });
            user.save().then(user => {
                res.json(user);
                User.findById(req.user.id)
                    .then(userReflect => {
                        userReflect.following.unshift({ _username: pre_username, username: preusername, profileURL: preprofileURL });

                        userReflect.save()
                            .then(() => console.log("success"))
                    })
            })
        })
        .catch(err => {
            //res.status(404).json(err);
            res.status(404).json({ usernotfound: 'No post found' });
        })
})



// @route       POST api/profile/upload
// @desc        upload the profile image
// @access      Private
router.post("/upload", passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const file = req.files.file;
    console.log(file);
    const currentDate = Date.now();
    const finalPath = './public/images/user/' + currentDate + "-" + file.name;
    const finalPathFixed = '/images/user/' + currentDate + "-" + file.name;
    file.mv(finalPath, function (err, result) {
        if (err) {
            //throw err;
            res.status(400).json({ error: "error occurs" })
        }

        User.findById(req.user.id)
            .then(userData => {
                userData.profileURL = finalPathFixed;
                userData.save().then(() => {
                    res.json({ sucess: "true", message: "file uploaded", path: finalPath, pathFixed: finalPathFixed })
                })
                    .catch(err => {
                        res.json(err)
                    })
            })
            .catch(err => {
                res.status(400).json(err)
            })

        //res.json({ sucess: "true", message: "file uploaded", path: finalPath, pathFixed: finalPathFixed})
    })
})

// @route       POST api/profile/uploadCover
// @desc        upload the cover profile image
// @access      Private
router.post("/uploadCover", passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const file = req.files.file;
    console.log(file);
    const currentDate = Date.now();
    const finalPath = './public/images/user/' + currentDate + "-" + file.name;
    const finalPathFixed = '/images/user/' + currentDate + "-" + file.name;
    file.mv(finalPath, function (err, result) {
        if (err) {
            //throw err;
            res.status(400).json({ error: "error occurs" })
        }

        User.findById(req.user.id)
            .then(userData => {
                userData.coverURL = finalPathFixed;
                userData.save().then(() => {
                    res.json({ sucess: "true", message: "file uploaded", path: finalPath, pathFixed: finalPathFixed })
                })
                    .catch(err => {
                        res.json(err)
                    })
            })
            .catch(err => {
                res.status(400).json(err)
            })

        //res.json({ sucess: "true", message: "file uploaded", path: finalPath, pathFixed: finalPathFixed})
    })
})

// @route       POST api/profile/edit
// @desc        edit the profile data
// @access      Private
router.post("/edit", passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.findById(req.user.id)
        .then(userData => {
            userData.firstname = req.body.firstname;
            userData.lastname = req.body.lastname;
            userData.save()
                .then(() => {
                    res.json({success:"true"})
                })
        })
        .catch(err => {
            res.json({error:"User not found"})
        })
})

module.exports = router;