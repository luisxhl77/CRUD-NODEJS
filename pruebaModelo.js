const mongoose = require('mongoose');
const Trip = require('./src/models/trips.model');

( async()=> {
    const user = 'lucho';
    const password = 'd8Ewtuslhf6k2lfi';
    await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.y7k7phm.mongodb.net/?retryWrites=true&w=majority`);

    const newTrip = await Trip.create({
        id: `${uuid()}`,
        image: 'aqui va la imagen en un formato **',
    })

    console.log(newTrip);

})();
