const express = require('express')
const prodController = require('../controllers/product_controller')
const prodRouter = express.Router()


prodRouter.get('/view/all', prodController.viewAllProducts)
prodRouter.get('/view/nikeproducts', prodController.viewNikeProducts)
prodRouter.get('/view/adidasproducts', prodController.viewAdidasProducts)
prodRouter.get('/view/newbalanceproducts', prodController.viewNewBalanceProducts)
prodRouter.get('/view/vansproducts', prodController.viewVansProducts)
prodRouter.get('/view/converseproducts', prodController.viewConverseProducts)
prodRouter.get('/view/othersproducts', prodController.viewOthersProducts)
prodRouter.get('/view/Sneakers',prodController.viewSneakerProducts)
prodRouter.get('/view/Apparels', prodController.viewApparelProducts)
prodRouter.get('/view/Essentials', prodController.viewEssentialProducts)
prodRouter.get('/view/:prod_name', prodController.viewProductViaProductName)


module.exports = prodRouter
