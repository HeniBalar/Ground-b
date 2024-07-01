const Booking = require('../../models/Booking')
const Ground = require('../../models/Ground')

exports.totalBooking = async (req, res) => {
    try {

        const booking = await Booking.find({})
        // console.log('bookig/...', booking)
        
        return res.status(200).send({ message: "OK", booking })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}

exports.bookingTrends = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        let groundIds = bookings.map(item => item.groundid);

        groundIds = [...new Set(groundIds)];
        
        const grounds = await Ground.find({ _id: { $in: groundIds } });
        // console.log('grounds/...', grounds)

        const trendingGround = grounds.filter(item => item.rating >= 4)

        // console.log("Trending Grounds: ", trendingGround);
        
        return res.status(200).send({ message: "OK", trendingGround });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
}

// exports.bookingValue = async (req, res) => {
//     try {

//         const booking = await Booking.find({})
//         let bookingDetails = []
//         booking.forEach((item) => {
//             bookingDetails.push({
//                 ownerid: item.ownerid,
//                 groundid: item.groundid,
//                 createdat: item.createdat
//             })
//         })
//         bookingDetails.sort((x, y) => new Date(x.createdat) - new Date(y.createdat))

//         const ground = await Ground.find({})
//         let groundDetails = []
//         ground.forEach((item) => {
//             let p = item.price
//             console.log('p/....', p)
//             groundDetails.push({
//                 groundid: item._id,
//                 ownerid: item.ownerid,
//                 price: item.price
//             })
//         })

//         let totalEarning = []
//         groundDetails.filter((x) => {
//             bookingDetails.forEach((y) => {
//                 if(x.ownerid.toString() == y.ownerid.toString()){
//                     totalEarning.push({
//                         ownerid: y.ownerid,
//                         price: x.price,
//                         createdat: y.createdat,
//                     })
//                 }
//             })
//         })
//         totalEarning.sort((x, y) => new Date(x.createdat) - new Date(y.createdat))

//         function groupData(data) {
//             const groupedData = {}
//             data.forEach((item) => {
//                 const key = `${item.ownerid}-${item.createdat}`
//                 if (!groupedData[key]) {
//                     groupedData[key] = {
//                         ownerid: item.ownerid,
//                         createdat: item.createdat,
//                         totalPrice: 0,
//                     }
//                 }
//                 groupedData[key].totalPrice += parseInt(item.price)
//             })
//             return Object.values(groupedData)
//         }

//         const result = groupData(totalEarning)
       
//         return res.status(200).send({ message: "OK", result })
//     } catch (error) {
//         console.log('error/...', error)
//         return res.status(500).send({ error: error.message })
//     }
// }

exports.bookingValue = async (req, res) => {
    try {
        const booking = await Booking.find({});
        let bookingDetails = [];
        booking.forEach((item) => {
            bookingDetails.push({
                ownerid: item.ownerid,
                groundid: item.groundid,
                createdat: item.createdat
            });
        });
        bookingDetails.sort((x, y) => new Date(x.createdat) - new Date(y.createdat));

        const ground = await Ground.find({});
        let groundDetails = [];
        ground.forEach((item) => {
            // console.log('item/...', item.price)
            item.price.forEach((x) => {
                console.log("x/...", x)
                groundDetails.push({
                    groundid: item._id,
                    ownerid: item.ownerid,
                    price: item.price
                });
            })
        });

        let totalEarning = [];
        groundDetails.filter((x) => {
            bookingDetails.forEach((y) => {
                if (x.ownerid.toString() == y.ownerid.toString()) {
                    totalEarning.push({
                        ownerid: y.ownerid,
                        price: x.price,
                        createdat: y.createdat,
                    });
                }
            });
        });
        totalEarning.sort((x, y) => new Date(x.createdat) - new Date(y.createdat));

        // function calculatePrice(priceArray) {
        //     let total = 0;
        //     priceArray.forEach((day) => {
        //         // console.log('Day:', day);
        //         if (Array.isArray(day.times)) {
        //             day.times.forEach((time) => {
        //                 // console.log('Time:', time.time);
        //                 if (time && time.cost) {
        //                     total += time.cost;
        //                 } else {
        //                     console.log('Invalid time object:', time);
        //                 }
        //             });
        //         } else {
        //             console.log('times is not an array:', day.times);
        //         }
        //     });
        //     return total;
        // }

        function groupData(data) {
            const groupedData = {};
            data.forEach((item) => {
                // console.log("item/...", item.price)
                const key = `${item.ownerid}-${item.createdat}`;
                if (!groupedData[key]) {
                    groupedData[key] = {
                        ownerid: item.ownerid,
                        createdat: item.createdat,
                        totalPrice: 0,
                    };
                }
                groupedData[key].totalPrice += (item.price);
            });
            return Object.values(groupedData);
        }

        const result = groupData(totalEarning);

        return res.status(200).send({ message: "OK", result });
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message });
    }
}