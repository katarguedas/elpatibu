const mongoose = require('mongoose');

//------------------------------------------------


const dataSchema = new mongoose.Schema({
    id: String,
    
    vital: {
        temperature: [Number],
        pressureHigh: [Number],
        pressureLow: [Number],
        pulse: [Number]
    },
    weight: [Number],
    wellBeeing: [Number],
    mood: [String],
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

const User = mongoose.model('User', userSchema)

module.exports = User;