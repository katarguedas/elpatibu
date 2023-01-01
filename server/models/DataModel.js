const mongoose = require('mongoose');
// const {Schema} = mongoose;

//------------------------------------------------

const testDataSchema = new mongoose.Schema({
    date: [Date],
    temperature: [Number]
})


const dateSchema = new mongoose.Schema({
    id: String,
    date1pd: [String],
    date2pd: [Date],
    date3pd: Date,
})

const temperatureSchema = new mongoose.Schema({
    id: String,
    label: String,
    unit: String,
    values: [Number],
    date: [Date],
    // date: { type: Schema.Types.ObjectId, ref: 'DateData' }
})

const dataSetSchema = new mongoose.Schema({
    id: String,
    diaryName: String,
    vital: {
        // temperature: { type: Schema.Types.ObjectId, ref: 'Temperature' },
        pressureHigh: [Number],
        pressureLow: [Number],
        pulse: [Number]
    },
    weight: [Number],
    wellBeing: [Number],
    mood: {
        mood: [String],
        moodSwing: [Number]
    },
    sleep: {
        hours: [Number],
        interruption: [Number],
        restful: [Number],
        medication: [String]
    },
    meteorosensitivity: {
        headache: [Number],
        fatigue: [Number],
        circulationProblems: [Number],
        insomnia: [Number]
    },
    symptoms: {
        pain: [Number],
        nausea: [Number],
        vomiting: [Number],
        diarrhea: [Number],
        pyrosis: [Number],
        fatigue: [Number],
        insomnia: [Number],
        vertigo: [Number], //Schwindel
        appetiteLoss: [Number],
        fingerTingling: [Number],
        memoryDisorder: [Number],
    },
    nutricion: {

    },
    medication: {

    }
})


const TestData = mongoose.model('Testdata', testDataSchema)
const DateData = mongoose.model('DateData', dateSchema)
const Temperature = mongoose.model('Temperature', temperatureSchema)
const DataSet = mongoose.model('DataSet', dataSetSchema)


// module.exports = Temperature;
// module.exports = DataSet;
// module.exports = DateData;

module.exports= { Temperature, TestData, DateData, DataSet};