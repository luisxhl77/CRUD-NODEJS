import { customerDAO } from "../dao/customer.dao";
import { ErrorResponse } from "../models/error,model";
    // aqui va el modelo de negocio

const getCustomersService = async() => {
    const result = await customerDAO.getAllCustomersDAO();
    
    if (!result[0]) {
        throw new ErrorResponse(404 ,{type:'error',message:'no registered customers'});            
    }

    return result;

};

const getCustomerService = async(dataCustomer) => {
    const getCustomer = await customerDAO.getCustomerDAO(dataCustomer);
    if (!getCustomer[0]) {
        throw new ErrorResponse(404, {type:'error',message:'user not found'});
    }

    return getCustomer;

};

const addCustomerService = async(customer, imageCustomer) => {

    if (!customer.name || !customer.lastname || !customer.documentType || !customer.documentNumber || !customer.age || !customer.cityOfBirth) {
        throw new ErrorResponse(404, {type:'error',message:'incomplete data'});
    }

    const customerData = {
        ...customer
    };

    const createCustomer = await customerDAO.createCustomerDAO(customerData, imageCustomer);
    return createCustomer;
        
};

const updateCustomerService = async(id, customer) => {

    if (!id) {
        throw new ErrorResponse(404, {type:'error',message:'id null'});
        
    }
    if (!customer.name || !customer.lastname || !customer.documentType || !customer.documentNumber || !customer.age || !customer.cityOfBirth) {
        throw new ErrorResponse(404, {type:'error',message:'incomplete data'});
    }

    const customerUpdate = {
        ...customer
    }; 

    const updatedCustomer = await customerDAO.updateCustomerDAO(id, customerUpdate);
    return updatedCustomer;

};

const deleteCustomerService = async(id) => {
    
    const deleteCustomer = await customerDAO.deleteCustomerDAO(id);

    if (deleteCustomer.affectedRows === 0) {
        throw new ErrorResponse(404, {type: 'error', message: 'user not found'});
    }
    
    return {message: 'customer deleted'};

};

export const customerService = {
    getCustomersService,
    getCustomerService,
    addCustomerService,
    updateCustomerService,
    deleteCustomerService
};