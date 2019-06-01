const express = require('express');
const router = express.Router();
const passport = require('passport');

//------------ Collection ----------------

const Post = require('../../models/Post')

const User = require('../../models/User')
// --------------------------------------


// @route       GET api/posts/test
// @desc        Tests post route
// @access      Public

router.get('/test', (req, res) => {
    res.json({ msg: "Posts Works" })
});


/*router.get('/testGT', (req, res) => {
    User.find({ '_id': { '$lt': "5ced3e11b153db18ec01b7e1" } }).sort({ date: -1 }).limit(2)
        .then(data => {
            res.json(data)
        })
});*/

// @route       GET api/posts/fetchPost/:lastId
// @desc        TEST fetch with get last id
// @access      Public
router.get('/fetchPost/:lastId', (req, res) => {
    console.log(req.params.lastId)
    User.find({ '_id': { '$lt': `${req.params.lastId}` } }).sort({ date: -1 }).limit(5)
        .then(data => {
            res.json(data)
        })
});

// @route       GET api/posts/page/:page/limit/:limit
// @desc        Test fetch with skip and limit
// @access      Public
router.get('/page/:page/limit/:limit', (req, res) => {
    let from;
    let limit = parseInt(req.params.limit);
    let page = parseInt(req.params.page);
    let totalDoc;

    Post.countDocuments().then((count) => {
        totalDoc = count;
    });
    console.log(totalDoc);
    if (page > 1){
        from = (limit * page) - limit;
    }
    else{
        //console.log("here")
        from = 0;
    }
    Post.find().populate('_username', ['username', 'profileURL'])
        .sort({ date: -1 }).skip(from).limit(limit)
        .then(posts => {
            let totalPage = parseInt(totalDoc / limit)
            let isMore = false;
            if (totalDoc > page){
                isMore = true;
            }
            res.json({
                total_pages: totalPage,
                has_more: isMore,
                posts
            });
        })
        .catch(err => {
            res.status(404).json({ nopostfound: 'No post found' });
        })
})

// @route       POST api/posts
// @desc        Create post
// @access      Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    const newPost = new Post({
        text: req.body.text,
        _username: req.user.id
    })

    newPost.save()
        .then(post => {
            res.json(post);
        })
})

// @route       POST api/posts/topic
// @desc        Create post within topic
// @access      Private
router.post('/topic', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        _username: req.user.id,
        posttype: 'topic',
        topic: req.body.topic
    })

    newPost.save()
        .then(post => {
            res.json(post);
        })
})

// @route       GET api/posts/topic/:topicName
// @desc        GET posts within topic
// @access      Private
router.get('/topic/:topicName', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    Post.find({ topic: req.params.topicName }).sort({ date: -1 }).populate('_username', ['username', 'profileURL'])
        .then(data => {
            res.json(data);
        })
})

// @route       POST api/posts/status
// @desc        Create post , status in our profile
// @access      Private
router.post('/status', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    const newPost = new Post({
        title: 'status',
        text: req.body.text,
        _username: req.user.id,
        posttype: 'status'

    })

    newPost.save()
        .then(post => {
            res.json(post);
        })
})

// @route       GET api/posts/status/:page/:lastId
// @desc        Get the status and store the lastId , fetch logic BY thiti
// @access      Private
router.get('/status/:page/:lastId', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    /*Post.find({_username:req.user.id})
        .sort({ date: -1 })
            .then(posts => {
                res.json(posts);
            })*/

    let page = parseInt(req.params.page);

    if (page === 1){
        Post.find({ _username: req.user.id,posttype:'status' }).sort({ date: -1 }).limit(5)
            .then(data => {
                res.json(data)
            })        
    }else{
        Post.find({ _username: req.user.id, posttype: 'status', '_id': { '$lt': `${req.params.lastId}` } }).sort({ date: -1 }).limit(5)
            .then(data => {
                res.json(data)
        })
    }
})

// @route       GET api/posts/inspect/:profileId/status/:page/:lastId
// @desc        Get the status , of the another person's ID
// @access      Private
router.get('/inspect/:profileId/status/:page/:lastId', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    /*Post.find({_username:req.user.id})
        .sort({ date: -1 })
            .then(posts => {
                res.json(posts);
            })*/

    let page = parseInt(req.params.page);

    if (page === 1) {
        Post.find({ _username: req.params.profileId, posttype: 'status' }).sort({ date: -1 }).limit(5)
            .then(data => {
                res.json(data)
            })
    } else {
        Post.find({ _username: req.params.profileId,posttype: 'status','_id': { '$lt': `${req.params.lastId}` } }).sort({ date: -1 }).limit(5)
            .then(data => {
                res.json(data)
            })
    }
})

// @route       DELETE api/posts/:postId
// @desc        Delete post
// @access      Private
router.delete('/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    Post.findById(req.params.postId)
        .then(post => {
            if (post._username.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorized' })
            }
            post.remove()
                .then(() => {
                    res.json({success: "true"})
                })
                .catch(err => {
                    res.status(404).json({ postnotfound: 'No post found' });
                })
        })
        .catch(err => {
            res.status(404).json({ postnotfound: 'No post found' });
        })

})

// @route       POST api/posts/comment/:id
// @desc        Add comment to post
// @access      Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/



    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                username: req.user.username,
                profileURL: req.user.profileURL
            }

            //Add to comment Array
            post.comments.unshift(newComment);

            //save
            post.save().then(post => {
                res.json(post);
            })
        })
        .catch(err => {
            res.status(404).json({ postnotfound: 'No post found' });
        })
})

// @route       POST api/posts/comment/:id
// @desc        Add comment to post
// @access      Private
router.get('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validatePostInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
    Post.findById(req.params.id)
        .then(post => {
            res.json(post.comments);
        })
        .catch(err => {
            res.status(404).json({ postnotfound: 'No post found' });
        })
})

// @route       POST api/posts/like/:postId
// @desc        Like post
// @access      Private
router.post('/like/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            if (post.likes.filter(like => like._username.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: 'User already liked this post' })
            }
            //Add user id to likes array
            post.likes.unshift({ _username: req.user.id });
            post.save().then(post => {
                res.json(post);
            })
        })
        .catch(err => {
            //res.status(404).json(err);
            res.status(404).json({ postnotfound: 'No post found' });
        })
})


module.exports = router;