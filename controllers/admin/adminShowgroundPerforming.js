const Ground = require('../../models/Ground')

exports.topPerformingground = async (req, res) => {
  try {
    const grounds = await Ground.find({})
    res.status(200).send({ message: 'OK', grounds })
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
    const grounds = await Ground.find({});
    
    if (grounds.length === 0) {
      return res.status(404).send({ message: 'No grounds found' });
    }
    
    const ratingSum = grounds.reduce((acc, current) => acc + Number(current.rating), 0);
    const averageRating = ratingSum / grounds.length;

    let graterThenFourStar = []
    let threeTofourStar = []
    let twoTothreeStar = []
    let oneTotwoStar = []
    let lessThenOneStar = []

    let ratingCategory;
    switch (true) {
      case (averageRating >= 4.5):
        ratingCategory = "Excellent";
        break;
      case (averageRating >= 4.0):
        ratingCategory = "Very Good";
        break;
      case (averageRating >= 3.5):
        ratingCategory = "Good";
        break;
      case (averageRating >= 3.0):
        ratingCategory = "Above Average";
        break;
      case (averageRating >= 2.5):
        ratingCategory = "Average";
        break;
      default:
        ratingCategory = "Below Average";
        break;
    }

    grounds.forEach((item) => {
      switch (true) {
        case (item.rating >= 4):
          graterThenFourStar.push(item);
          break;
        case (item.rating <=4 && item.rating >=3):
          threeTofourStar.push(item);
          break;
        case (item.rating <=3 && item.rating >=2):
          twoTothreeStar.push(item);
          break;
        case (item.rating <=2 && item.rating >=1):
          oneTotwoStar.push(item);
          break;
        case (item.rating <=1):
          lessThenOneStar.push(item);
          break;      
        default:
          console.log('error')
          break;
      }
    })

    res.status(200).send({ 
      message: 'OK',
      averageRating, 
      ratingCategory,
      graterThenFourStar: graterThenFourStar.length,
      threeTofourStar: threeTofourStar.length,
      twoTothreeStar: twoTothreeStar.length,
      oneTotwoStar: oneTotwoStar.length,
      lessThenOneStar: lessThenOneStar.length,

      // averageRating : 3.2161290322580647
      // ratingCategory : "Above Average"
      // graterThenFourStar : 17
      // threeTofourStar : 7
      // twoTothreeStar : 0
      // oneTotwoStar : 0
      // lessThenOneStar : 7
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: error.message });
  }
};