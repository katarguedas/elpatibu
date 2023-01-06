const mongoose = require('mongoose');

//------------------------------------------------


//---children ------------------------------------------

const dateSchema = new mongoose.Schema({
    id: String,
    diaryName: String,
    values: [Date]
});

const valuesSchema = new mongoose.Schema({
    id: String,
    label: String,
    unit: String,
    values: [Number],
});

// --------parent: ----------------------------------------------

const dataSetSchema = new mongoose.Schema({
    id: String,
    diaryName: String,
    date: [dateSchema],
    vital: {
        temperature: {valuesSchema},
        pressureHigh: {valuesSchema},
        pressureLow: {valuesSchema},
        pulse: {valuesSchema},
    },
    weight: {valuesSchema},
    wellBeing: {valuesSchema},
    mood: {
        mood: {valuesSchema},
        moodSwing: {valuesSchema},
    },
    sleep: {
        hours: {valuesSchema},
        interruption: {valuesSchema},
        restful: {valuesSchema},
    },
    meteorosensitivity:
    {
        headache: {valuesSchema},
        fatigue: {valuesSchema},
        circulationProblems: {valuesSchema},
        insomnia: {valuesSchema},
    },
    symptoms: {
        pain: {valuesSchema},
        nausea: {valuesSchema},
        vomiting: {valuesSchema},
        diarrhea: {valuesSchema},
        pyrosis: {valuesSchema},
        fatigue: {valuesSchema},
        insomnia: {valuesSchema},
        vertigo: {valuesSchema},
        appetiteLoss: {valuesSchema},
        fingerTingling: {valuesSchema},
        memoryDisorder: {valuesSchema}
    },
    // medication: {valuesSchema},
});

const DataSet = mongoose.model('DataSet', dataSetSchema);

module.exports = { DataSet };



//.........................

// const dataSetSchema = new mongoose.Schema({
//     id: String,
//     diaryName: String,
//     date: [dateSchema],
//     vital: {
//         temperature: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         pressureHigh: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         pressureLow: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         pulse: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//     },
//     weight: {
//         id: String,
//         label: String,
//         unit: String,
//         values: [valuesSchema]
//     },
//     wellBeing: {
//         id: String,
//         label: String,
//         unit: String,
//         values: [valuesSchema]
//     },
//     mood: {
//         mood: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         moodSwing: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         }
//     },
//     slep: {
//         hours: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         interruption: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         restful: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         medication: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         }
//     },
//     meteorosensitivity: {
//         headache: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         fatigue: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         circulationProblems: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         insomnia: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//     },
//     symptoms: {
//         pain: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         nausea: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         vomiting: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         diarrhea: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         pyrosis: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         fatigue: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         insomnia: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         vertigo: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         appetiteLoss: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         fingerTingling: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         },
//         memoryDisorder: {
//             id: String,
//             label: String,
//             unit: String,
//             values: [valuesSchema]
//         }
//     },
// });