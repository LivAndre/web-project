const express = require('express')
const prodController = require('../controllers/product_controller')
const prodRouter = express.Router()


prodRouter.get('/view/all', prodController.viewAllProducts)
prodRouter.get('/view/newarrivals', prodController.viewNewArrivals)
prodRouter.get('/view/newesttooldest', prodController.viewNewestToOldest)
prodRouter.get('/view/oldesttonewest', prodController.viewOldestToNewest)

prodRouter.get('/view/collections/nike-sneakers', prodController.viewNikeSneakers)
prodRouter.get('/view/collections/adidas-sneakers', prodController.viewAdidasSneakers)
prodRouter.get('/view/collections/newbalance-sneakers', prodController.viewNewBalanceSneakers)
prodRouter.get('/view/collections/vans-sneakers', prodController.viewVansSneakers)
prodRouter.get('/view/collections/converse-sneakers', prodController.viewConverseSneakers)
prodRouter.get('/view/collections/others-sneakers', prodController.viewOthersSneakers)
prodRouter.get('/view/collections/sizes', prodController.filterSneakerSizes)


prodRouter.get('/view/collections/Sneakers',prodController.viewSneakerProducts)
prodRouter.get('/view/collections/Apparels', prodController.viewApparelProducts)
prodRouter.get('/view/collections/Essentials', prodController.viewEssentialProducts)

prodRouter.get('/view/search/:prod_name', prodController.viewProductViaProductName)


module.exports = prodRouter



  

  