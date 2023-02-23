const mongoose = require('mongoose');

//------------------------------------------------


const itemSchema = new mongoose.Schema({
	name: String,
	id: String,
	label: String,
	unit: String,
	selected: Boolean,
	measurable: Boolean,
	values: []
})

const groupSchema = new mongoose.Schema({
	id: String,
	name: String,
	label: String,
	visible: Boolean,
	items: [itemSchema]
})

// --------parent: ----------------------------------------------

const diarySchema = new mongoose.Schema({
	id: String,
	diaryName: String,
	city: String,
	date: [Date],
  timestamp: [Number],
	groups: [groupSchema]
});


const Item = mongoose.model('Item', itemSchema)
const Group = mongoose.model('Group', groupSchema)
const Diary = mongoose.model('Diary', diarySchema)


module.exports = { Diary, Group, Item };

