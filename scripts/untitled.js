var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TimeWise');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  
});

function createContentListing(title, description, sourceID, imageURL, contentURL, duration) {
	return {
		"title" : title
		"description" : description
		"sourceID" : sourceID
		"imageURL" : imageURL
		"contentURL" : contentURL
		"duration" : duration
	}
}

var listingSchema = mongoose/Schema({
	"title" : String,
	"description" : String,
	"sourceID" : String,
	"imageURL" : String,
	"contentURL" : String,
	"duration" : Number
})
var Listing = mongoose.model('Listing', listingSchema);