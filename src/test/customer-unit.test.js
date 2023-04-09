const app = require('../app');
const { customerService } = require('../service/customerService');
import { customerDAO } from "../dao/customer.dao";
jest.mock('../dao/customer.dao');

beforeEach(() => {
    customerDAO.getAllCustomersDAO.mockClear();
    customerDAO.getCustomerDAO.mockClear();
    customerDAO.createCustomerDAO.mockClear();
    customerDAO.updateCustomerDAO.mockClear();
})

// const customer = {
//     name: 'john',
//     lastname: 'ospina',
//     documentType: 'C.C',
//     documentNumber: '20202020',
//     age: 77,
//     cityOfBirth: 'cucuta',
// }
// const getCustomer = [{
//     age: 23, 
//     cityOfBirth: "Medellin-antioquia", 
//     documentNumber: "1022036498", 
//     documentType: "C.C", 
//     id: 1, 
//     lastname: "hernandez lopez", 
//     name: "luis carlos"
// }]
// const listCustomers = [{
//     age: 23, 
//     cityOfBirth: "Medellin-antioquia", 
//     documentNumber: "1022036498", 
//     documentType: "C.C", 
//     id: 1, 
//     lastname: "hernandez lopez", 
//     name: "luis carlos"
// }]

// const customerUpdate = {
//     age: 23, 
//     cityOfBirth: "Medellin-antioquia", 
//     documentNumber: "1022036498", 
//     documentType: "C.C", 
//     lastname: "hernandez lopez", 
//     name: "luis carlos"
// }

// describe('Create customer', () => {

//     test('should store a customer', async() => {
//         const result = await customerService.addCustomerService(customer);
//         expect(result).toEqual(customer);

//     });

// });

// describe('Get customer', () => {

//     test('get customer by document or age', async() => {
//         const result = await customerService.getCustomerService(1022036498);
//         expect(result).toEqual(getCustomer);

//     });

    // test('get all customers', async() => {
    //     const result = await customerService.getCustomersService();
    //     expect(result).toEqual(getCustomer);

    // });
// })

// describe('Delete customer', () => {

//     test('delete customer by id', async() => {
//         const result = await customerService.deleteCustomerService(72);
//         expect(result).toEqual({message: "deleted customer"});

//     });
// })

// describe('Update customer', () => {

//     test('Update customer by id', async() => {
//         const result = await customerService.updateCustomerService(1, customerUpdate);
//         expect(result).toEqual(customerUpdate);

//     });
// })


describe('Get customer', () => {

    test('get all customers', async() => {
        const listCustomers = [{
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "1022036498", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "luis carlos"
        },{
            age: 55, 
            cityOfBirth: "Bogota", 
            documentNumber: "576878", 
            documentType: "C.C", 
            id: 2, 
            lastname: "lopez", 
            name: "maria clara"
        }
        ]
        customerDAO.getAllCustomersDAO.mockReturnValueOnce(listCustomers)

        const result = await customerService.getCustomersService();

        expect(result).toHaveLength(2);
        expect(result).toEqual(listCustomers);
        expect(customerDAO.getAllCustomersDAO).toHaveBeenCalledTimes(1);
    });

    test('get all customers error in serice', async() => {
        customerDAO.getAllCustomersDAO.mockReturnValueOnce(new Error('error en la api'));

        const result = await customerService.getCustomersService();
        expect(result).toBeInstanceOf(Error);

        expect(customerDAO.getAllCustomersDAO).toHaveBeenCalledTimes(1);
    });

    test('get customer by document or age', async() => {
        const listCustomers = [{
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "1022036498", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "luis carlos"
        }
        ]
        customerDAO.getCustomerDAO.mockReturnValueOnce(listCustomers)

        const result = await customerService.getCustomerService(1022036498);
        
        expect(result).toEqual([{
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "1022036498", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "luis carlos"
        }]);

    });
})

describe('Create customer', () => {

    test('should store a customer', async() => {
        const customer = {
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "1022036498", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "luis carlos"
        }
        
        customerDAO.createCustomerDAO.mockReturnValueOnce(customer);

        const result = await customerService.addCustomerService(customer);
        expect(result).toEqual(customer);

    });

    test('create customer error in serice', async() => {
        const customerError = {
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "luis carlos"
        }
        if (customerError.documentNumber.length < 9) {
            customerDAO.createCustomerDAO.mockReturnValueOnce(new Error('datos incompletos'));

            const result = await customerService.addCustomerService(customerError);
            
            expect(result).toBeInstanceOf(Error);
            expect(customerDAO.createCustomerDAO).toHaveBeenCalledTimes(1);
            
        }

    });

});

describe('update customer', () => {

    test('should store a customer', async() => {
        const customer = {
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "1022036498", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "luis carlos"
        }
        
        customerDAO.updateCustomerDAO.mockReturnValueOnce(customer);

        const result = await customerService.updateCustomerService(customer);
        expect(result).toEqual(customer);

    });

    test('modify customer error in serice', async() => {
        const customerError = {
            age: 23, 
            cityOfBirth: "Medellin-antioquia", 
            documentNumber: "1022036498", 
            documentType: "C.C", 
            id: 1, 
            lastname: "hernandez lopez", 
            name: "lu"
        }
        if (customerError.name.length <= 4) {
            customerDAO.updateCustomerDAO.mockReturnValueOnce(new Error('datos incompletos'));
            
            const result = await customerService.updateCustomerService(customerError);
            expect(result).toBeInstanceOf(Error);
    
            expect(customerDAO.updateCustomerDAO).toHaveBeenCalledTimes(1);
            
        }

    });

});

describe('Delete customer', () => {

    test('delete customer by id', async() => {

        customerDAO.deleteCustomerDAO.mockReturnValueOnce({message: 'deleted customer'});

        const result = await customerService.deleteCustomerService(2);
        expect(result).toEqual({message: 'deleted customer'});

    });


    test('delete customer by id', async() => {
        let idCustomer;
        
        if (idCustomer = undefined) {
            customerDAO.deleteCustomerDAO.mockReturnValueOnce(new Error('Este usuario no existe'));
    
            const result = await customerService.deleteCustomerService(idCustomer);
            expect(result).toBeInstanceOf(Error);
    
            expect(customerDAO.deleteCustomerDAO).toHaveBeenCalledTimes(1);
            
        }

    });
});
