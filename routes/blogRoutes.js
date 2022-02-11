const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()

router.get('', blogController.blog_index)

router.post('', blogController.blog_create_get)


router.get('/:id', blogController.blog_details)
module.exports = router