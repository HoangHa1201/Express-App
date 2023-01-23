const express = require("express");
const router = express.Router();

const Data = require('../models/data');


// get all the posts
router.get('/getall', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.json({ message: error });
    }
})
// get details data
router.get('/getdetail/:dataId', async (req, res) => {
    try {
        const dataDetail = await Data.findById(req.params.dataId);
        res.json(dataDetail);
    } catch (error) {
        res.json({ message: error });
    }
})
// submit a post
router.post('/post', async (req, res) => {

    const data = new Data({
        title: req.body.title,
        description: req.body.description,
        linkImg: req.body.linkImg
    });
    try {
        const savedData = await data.save();
        res.json(savedData);
    } catch (error) {
        res.send(error);
    }
});

// update a post
router.patch('/update/:dataId', async (req, res) => {
    try {
        const updatedData = await Data.updateOne(
            { _id: req.params.dataId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    linkImg: req.body.linkImg
                },
            }
        );
        res.json(updatedData);
    } catch (error) {
        res.json({ message: error });
    }
});

// delete a post
router.delete('/delete/:dataId', async (req, res) => {
    try {
        const removedData = await Data.remove({ _id: req.params.dataId });
        res.json(removedData);
    } catch (error) {
        res.json({ message: error });
    }
});
module.exports = router;