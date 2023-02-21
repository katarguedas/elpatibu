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



//.........................


// const dataSetSchema = new mongoose.Schema({
//     id: String,
//     diaryName: String,
//     date: [dateSchema],
//     vital: {
//         temperature: {valuesSchema},
//         pressureHigh: {valuesSchema},
//         pressureLow: {valuesSchema},
//         pulse: {valuesSchema},
//     },
//     weight: {valuesSchema},
//     wellBeing: {valuesSchema},
//     mood: {
//         mood: {valuesSchema},
//         moodSwing: {valuesSchema},
//     },
//     sleep: {
//         hours: {valuesSchema},
//         interruption: {valuesSchema},
//         restful: {valuesSchema},
//     },
//     meteorosensitivity:
//     {
//         headache: {valuesSchema},
//         fatigue: {valuesSchema},
//         circulationProblems: {valuesSchema},
//         insomnia: {valuesSchema},
//     },
//     symptoms: {
//         pain: {valuesSchema},
//         nausea: {valuesSchema},
//         vomiting: {valuesSchema},
//         diarrhea: {valuesSchema},
//         pyrosis: {valuesSchema},
//         fatigue: {valuesSchema},
//         insomnia: {valuesSchema},
//         vertigo: {valuesSchema},
//         appetiteLoss: {valuesSchema},
//         fingerTingling: {valuesSchema},
//         memoryDisorder: {valuesSchema}
//     },
//     // medication: {valuesSchema},
// });