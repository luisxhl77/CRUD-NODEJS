import { getConecction } from "../database/database";
const CustomerModel = require("../models/image.model");

const getAllCustomersDAO = async() => {
    try {

        const customers = await CustomerModel.find({})

        const sql ="SELECT * FROM person"; 

        const connection = await getConecction();
        const result = await connection.query(sql);

        let valor = [];
        for (let i = 0; i < result.length; i++) {
            valor.push({
                ...result[i],
                image: customers[i]
            })
            
        }
        
        return valor;

    } catch (err) {
        throw new Error(`${err}`);

    }
};

const getCustomerDAO = async(dataCustomer) => {
    try {

        const sql = 'SELECT * FROM person WHERE documentNumber LIKE ? or age >= ?';

        const connection = await getConecction();
        const result = await connection.query(sql,[dataCustomer, dataCustomer]);
        // const id = await result.id;
        // const customers = await CustomerModel.findById(id)
        // console.log('esto',id);
        return result;

    } catch (err) {
        throw new Error(`${err}`);

    }
};

const createCustomerDAO = async(customerInsert, imageCustomer) => {
    
    try {
        
        //mongoDB
        const customer = new CustomerModel({
            id: customerInsert.id,
            image: imageCustomer.image
        })
        const resul = await customer.save();
        
        //mySql
        const sql = 'INSERT INTO person SET ?';
        const connection = await getConecction();
        const result = await connection.query(sql, customerInsert);

        return {
            ...customerInsert,
            image:{
                id: resul.id,
                image: resul.image,
            }
            
        };
    
    } catch (error) {
        throw new Error(`${error}`);
    }

};

const updateCustomerDAO = async(id, customerUpdate) => {
    try {

        const customer = await CustomerModel.updateOne({id:id},{
            $set:{
                id: id,
                image: 'alberto'
            }
        })

        const sql = 'UPDATE person SET ? WHERE id = ?';
    
        const connection = await getConecction();
        const result = await connection.query(sql, [customerUpdate,id]);
        return customerUpdate;

    } catch (error) {
        throw new Error(`${error}`);

    }
};

const deleteCustomerDAO = async(id) => {
    try {

        const customer = await CustomerModel.deleteOne({id:id})
        console.log(customer);


        const sql = 'DELETE FROM person WHERE id = ?';

        const connection = await getConecction();
        const result = await connection.query(sql,id);
        return result;
        
    } catch (error) {
        throw new Error(`${error}`);

    }
};

export const customerDAO = {
    getAllCustomersDAO,
    getCustomerDAO,
    createCustomerDAO,
    updateCustomerDAO,
    deleteCustomerDAO
};