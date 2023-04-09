const request = require('supertest');
const app = require('../app');

const customer = {
    name: 'john',
    lastname: 'ospina',
    documentType: 'C.C',
    documentNumber: '20202020',
    age: 77,
    cityOfBirth: 'cucuta',
}

describe('Customer intergation', () => {

    test('should store a customer 1', async() => {
        const result = await request(app)
            .post('/addcustomer')
            .send(customer)
            .set('Accept', 'application/json')
            .expect(201)

        expect(result.body).toEqual({status: 'success'});
    });

});