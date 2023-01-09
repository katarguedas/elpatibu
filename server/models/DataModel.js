const mongoose = require('mongoose');

//------------------------------------------------

const temperatureSchema = new mongoose.Schema({
    id: String,
    label: String,
    unit: String,
    values: [Number],
    date: [Date],
    // date: { type: Schema.Types.ObjectId, ref: 'DateData' }
})

//---children ------------------------------------------

const dateSchema = new mongoose.Schema({
    id: String,
    values: [Date]
});

const valuesSchema = new mongoose.Schema({
    name: String,
    id: String,
    label: String,
    unit: String,
    selected: Boolean,
    values: []
});


const itemSchema = new mongoose.Schema({
    name: String,
    id: String,
    label: String,
    unit: String,
    selected: Boolean,
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
    date: [],
    groups: [groupSchema]
});

const Item = mongoose.model('Item', itemSchema)
const Group = mongoose.model('Group', groupSchema)
const Diary = mongoose.model('Diary', diarySchema)

// const DataSet = mongoose.model('DataSet', dataSetSchema);
const Temperature = mongoose.model('Temperature', temperatureSchema)

module.exports = { Diary, Group, Item, Temperature };



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