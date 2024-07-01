const Ground = require('../../models/Ground')
const Review = require('../../models/Review')

exports.topPerformingground = async (req, res) => {
  try {
    const ground = await Ground.find({})
    const result = ground.map((x) => {
      return x.nooftimebooked
    })
    res.status(200).send({ message: 'OK', ground })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send({ error: error.message })
  }
}

exports.underPerformingground = async (req, res) => {
  try {
    const grounds = await Ground.find({})
    const underperformingGrounds = grounds.filter( (ground) => ground.nooftimebooked < 5 )
    res.status(200).send({ message: 'OK', underperformingGrounds })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send({ error: error.message })
  }
}

exports.venueRating = async (req, res) => {
  try {
    const reviews = await Review.find({});
    const ground = await Ground.find({});

    const groupedData = {};
    reviews.forEach(item => {
      const key = item.groundid;
      if (!groupedData[key]) {
        groupedData[key] = {
          groundid: item.groundid,
          sum: 0,
          count: 0,
          createdat: item.createdat
        };
      }
      groupedData[key].sum += parseFloat(item.rate);
      groupedData[key].count++;
    });

    const ratingData = Object.values(groupedData).map(item => ({
      groundid: item.groundid,
      rating: (item.sum / item.count).toFixed(1),
      createdat: item.createdat
    }))

    await Promise.all(ratingData.map(async (item) => {
      await Ground.findByIdAndUpdate( 
        { 
          _id: item.groundid 
        },
        { 
          $set: {
            rating: item.rating
          }
        }
      );
    }))

    const groundNameMap = ground.reduce((acc, ground) => {
      acc[ground._id] = {
        name: ground.groundname,
        address: ground.address
      };
      return acc;
    }, {});
    
    const result = ratingData.map(ground => {
      return {
        ...ground,
        nameAndlocation: groundNameMap[ground.groundid]
      };
    });

    res.status(200).send({ message: "OK", result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: error.message });
  }
};

exports.reviewTrend = (req, res) => {
  try {

    
    
    return res.status(200).send({ message: "OK" })
  } catch (error) {
    console.log({ error: error.message })
    return res.status(500).send({ error: error.message })
  }
}