/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-27 20:47:15
 * @modify date 2019-12-27 20:47:15
 * @desc Define app routes.
 */

const express = require("express");

const TransacationController = require("../app/core/controllers/TransactionController");
const PayablesController = require("../app/core/controllers/PayablesController");
const Util = require("../app/core/Util");

class Routes {
  constructor() {
    this.router = express.Router();

    this.prepareRoutes();
  }

  loadRoutes() {
    return this.router;
  }

  /** App routes. */
  prepareRoutes() {
    this.router.post("/transaction/createPayment", TransacationController.createPayment.bind(this));
    this.router.get("/transaction/getTransactions", TransacationController.getTransactions.bind(this));
    this.router.get("/transaction/getTransaction/:clientId", TransacationController.getTransactions.bind(this));

    this.router.get('/payable/funds/:clientId/:type', PayablesController.getClientFunds.bind(this));
  }
}

module.exports = Routes;
