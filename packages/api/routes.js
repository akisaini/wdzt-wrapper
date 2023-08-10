const express = require("express")
const Pyramid = require("./pyramidschema") // new
const router = express.Router()


// Get all posts
router.get("/pyramids", async (req, res) => {
	const pyrs = await Pyramid.find()
	res.send(pyrs)
})

//post
router.post("/pyramids", async (req, res) => {
	const pyramid = new Pyramid({
		pyramidId: req.body.pyramidId,
		name: req.body.name,
	})
	await pyramid.save()
	res.send(pyramid)
})

//get pyramid by object id
router.get("/pyramids/:id", async (req, res) => {
	try {
		const pyramid = await Pyramid.findOne({ _id: req.params.id })
		res.send(pyramid)
	} catch {
		res.status(404)
		res.send({ error: "Pyramid doesn't exist!" })
	}
})

//update existing pyramid data
router.patch("/pyramids/:id", async (req, res) => {
	try {
		const pyramid = await Pyramid.findOne({ _id: req.params.id })

		if (req.body.pyramidId) {
			pyramid.pyramidId = req.body.pyramidId	
		}

		if (req.body.name) {
			pyramid.name = req.body.name
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Pyramid doesn't exist!" })
	}
})


//Delete pyramid data 
router.delete("/pyramids/:id", async (req, res) => {
	try {
		await Pyramid.deleteOne({ _id: req.params.id })
		res.status(204).send()
		console.log('Pyramid data deleted')
	} catch {
		res.status(404)
		res.send({ error: "Pyramid doesn't exist!" })
	}
})


module.exports = router;
