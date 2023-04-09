import { customerService } from "../service/customerService";
import {v4 as uuid} from "uuid";
const fs = require('fs');

const getCustomers = async(req, res) => {
    try {
        const getcustomersResult = await customerService.getCustomersService();
        res.status(201).send({status: "success", data: getcustomersResult});
        
    } catch (err) {
        res.status(err.statusCode).send(err.message);
    }
};

const getCustomer = async(req, res) => {
    try {
        const dataCustomer = req.params.data + "%";
        
        const getcustomerResult = await customerService.getCustomerService(dataCustomer);
        res.status(201).send({status: "success", data: getcustomerResult});

    } catch (err) {
        res.status(err.statusCode).send(err.message);
    }
};

const addCustomer = async(req, res) => {
    try {

        const fileToBase64 = (filePath) => {
            // Read file as a Buffer
            const fileBuffer = fs.readFileSync(filePath);
            console.log(fileBuffer)
            // // Convert Buffer to Base64-encoded string
            // const base64String = fileBuffer.toString('base64');
            // console.log(base64String);
            // return base64String;
        }
        const image = await req.body.image;
        fileToBase64(image);

        const customer = {
            id: uuid(),
            name: req.body.name,
            lastname: req.body.lastname,
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            age: req.body.age,
            cityOfBirth: req.body.cityOfBirth,
        };
        const imageCustomer = {
            image: req.body.image,
        }
        
        const addCustomerResult = await customerService.addCustomerService(customer,imageCustomer);
        res.status(201).send({status: "success", data: addCustomerResult});
        
    } catch (err) {
        res.status(err.statusCode).send(err.message);
    }

};

const updateCustomer = async(req, res) => {
    try {
        const customer = {
            name: req.body.name,
            lastname: req.body.lastname,
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            age: req.body.age,
            cityOfBirth: req.body.cityOfBirth,
        };
        
        const { id } = req.params;
        
        if ( !id ) {
            return;
        }
    
        const updateCustomerResult = await customerService.updateCustomerService(id, customer);
        res.status(201).send({status: "success", data: updateCustomerResult});
        
    } catch (err) {
        res.status(err.statusCode).send(err.message);

    }

};

const deleteCustomer = async(req, res) => {
    try {
        const { id } = req.params;
    
        const deleteCustomerResult = await customerService.deleteCustomerService(id);
        res.status(201).send({status: "success", data: deleteCustomerResult});
        
    } catch (err) {
        res.status(err.statusCode).send(err.message);
        
    }
};

export const methods = {
    getCustomers,
    getCustomer,
    addCustomer,
    deleteCustomer,
    updateCustomer
};