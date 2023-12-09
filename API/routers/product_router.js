const express = require('express')
const prodController = require('../controllers/product_controller')
const prodRouter = express.Router()

prodRouter.get('/view/search/:prod_name', prodController.viewProductViaProductName)

prodRouter.get('/view/all', prodController.viewAllProducts)
prodRouter.get('/view/newarrivals', prodController.viewNewArrivals)
prodRouter.get('/view/newesttooldest', prodController.viewNewestToOldest)
prodRouter.get('/view/oldesttonewest', prodController.viewOldestToNewest)
prodRouter.get('/view/lowesttohighest', prodController.viewLowestToHighest)
prodRouter.get('/view/highesttolowest', prodController.viewHighestToLowest)


prodRouter.get('/view/collections/sizes', prodController.filterSneakerSizes)
prodRouter.get('/view/collections/brands', prodController.filterSneakerBrands)
prodRouter.get('/view/collections/category', prodController.filterProductCategory)






module.exports = prodRouter



  

  