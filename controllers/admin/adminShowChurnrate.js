const Booking = require('../../models/Booking')

exports.churnRate = async (req, res) => {
    try {

        const booking = await Booking.find({})

        const periodStart = new Date('2023-09-01T00:00:00.000Z');
        const periodEnd = new Date('2023-10-30T00:00:00.000Z');

        let customers = {};

        booking.forEach(booking => {
            const bookedBy = booking.bookedby;
            const createdAt = new Date(booking.createdat);

            console.log('customer[bookedby]1111/....', customers[bookedBy])
            if (!customers[bookedBy]) {
                customers[bookedBy] = { active: false, previouslyActive: false };
            }
            console.log('customer[bookedby]2222/....', customers[bookedBy])

            if (createdAt >= periodStart && createdAt < periodEnd) {
                customers[bookedBy].active = true;
            } else {
                customers[bookedBy].previouslyActive = true;
            }
        });
        
        // let churnedCustomers = 0;
        // let initialCustomers = 0;

        // Object.values(customers).forEach(activity => {
        //     if (activity.previouslyActive) {
        //         initialCustomers++;
        //         if (!activity.active) {
        //             churnedCustomers++;
        //         }
        //     }
        // });

        // const churnRate = initialCustomers > 0 ? (churnedCustomers / initialCustomers) * 100 : 0;
        
        // console.log('initialCustomers/...', initialCustomers)
        // console.log('churnedCustomers/...', churnedCustomers)
        // console.log('initialCustomers/...', initialCustomers)
        // console.log('churnRate/...', churnRate)
        
        
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log('error/..', error)
        return res.status(500).send({ errro: error.message })
    }
}
