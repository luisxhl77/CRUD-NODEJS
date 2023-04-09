import { Router } from "express";
import { methods as customerController } from "../controllers/customer.controller";

const router = Router();

router.get("/", customerController.getCustomers);
router.get("/:data", customerController.getCustomer);
router.post("/addcustomer", customerController.addCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;