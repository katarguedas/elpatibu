import { v4 as uuidv4 } from 'uuid';

//--------------------------------------------------------------------------


const useTemplates = () => {


	const diaryInit = () => {

		return (
			{
				id: uuidv4(),
				diaryName: 'Tagebuch1',
				city: '',
				date: [],
				timestamp: [],
				groups: [
					{
						id: uuidv4(),
						name: 'vital',
						label: 'Vitalwerte',
						visible: false,
						items: [
							{
								name: 'temperature',
								id: uuidv4(),
								label: 'Temperatur',
								unit: '°C',
								selected: false,
								measurable: true,
								values: []
							},
							{
								name: 'pressureHigh',
								id: uuidv4(),
								label: 'Systolischer Blutdruck',
								unit: 'mmHg',
								selected: false,
								measurable: true,
								values: []
							},
							{
								name: 'pressureLow',
								id: uuidv4(),
								label: 'Diastolischer Blutdruck',
								unit: 'mmHg',
								selected: false,
								measurable: true,
								values: []
							},
							{
								name: 'pulse',
								id: uuidv4(),
								label: 'Pulse',
								unit: '1/Min',
								selected: false,
								measurable: true,
								values: []
							}
						]
					},
					{
						id: uuidv4(),
						name: 'weight',
						label: 'Körpergewicht',
						visible: false,
						items: [
							{
								name: 'weight',
								id: uuidv4(),
								label: 'Körpergewicht',
								unit: 'kg',
								selected: false,
								measurable: true,
								values: []
							},
						]
					},
					{
						id: uuidv4(),
						name: 'wellBeing',
						label: 'Allgemeines Wohlbefinden',
						visible: false,
						items: [
							{
								name: 'wellBeing',
								id: uuidv4(),
								label: 'Allgemeines Wohlbefinden',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							}
						]
					},
					{
						id: uuidv4(),
						name: 'mood',
						label: 'Stimmung',
						visible: false,
						items: [
							{
								name: 'mood',
								id: uuidv4(),
								label: 'Stimmung',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'moodSwings',
								id: uuidv4(),
								label: 'Stimmungsschwankungen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							}
						]
					},
					{
						id: uuidv4(),
						name: 'sleep',
						label: 'Schlaf',
						visible: false,
						items: [
							{
								name: 'hours',
								id: uuidv4(),
								label: 'Stunden Schlaf por Nacht',
								unit: 'Std.',
								selected: false,
								measurable: true,
								values: []
							},
							{
								name: 'interruption',
								id: uuidv4(),
								label: 'Schlafunterbrechungen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'restful',
								id: uuidv4(),
								label: 'Erholung durch Schlaf',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							}
						]
					},
					{
						id: uuidv4(),
						name: 'meteorosensitivity',
						label: 'Wetterfühligkeit',
						visible: false,
						items: [
							{
								name: 'headache',
								id: uuidv4(),
								label: 'Kopfschmerzen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'fatigue',
								id: uuidv4(),
								label: 'Müdigkeit / Erschöpfung',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'circulationProblems',
								id: uuidv4(),
								label: 'Kreislaufprobleme',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'insomnia',
								id: uuidv4(),
								label: 'Schlafstörungen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'joint pain',
								id: uuidv4(),
								label: 'Gelenkschmerzen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							}
						]
					},
					{
						id: uuidv4(),
						name: 'symptoms',
						label: 'Symptome',
						visible: false,
						items: [
							{
								name: 'pain',
								id: uuidv4(),
								label: 'Schmerzen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'nausea',
								id: uuidv4(),
								label: 'Übelkeit',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'vomiting',
								id: uuidv4(),
								label: 'Erbrechen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'diarrhea',
								id: uuidv4(),
								label: 'Durchfall',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'pyrosis',
								id: uuidv4(),
								label: 'Sodbrennen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'fatigue',
								id: uuidv4(),
								label: 'Müdigkeit / Abgeschlagenheit',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'insomnia',
								id: uuidv4(),
								label: 'Schlafstörungen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'vertigo',
								id: uuidv4(),
								label: 'Schwindelgefühl',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'appetiteLoss',
								id: uuidv4(),
								label: 'Appetitlosigkeit',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'fingerTingling',
								id: uuidv4(),
								label: 'Kribbeln in den Fingern',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							},
							{
								name: 'memoryDisorder',
								id: uuidv4(),
								label: 'Gedächtnisstörungen',
								unit: '-',
								selected: false,
								measurable: false,
								values: []
							}
						]
					}
				]
			})
	}


	const editedGroups = () => {

		return (
			{
				groups: [
					{
						name: 'vital',
						items: [
							{
								name: 'temperature',
								done: false,
							},
							{
								name: 'pressureHigh',
								done: false,
							},
							{
								name: 'pressureLow',
								done: false,
							},
							{
								name: 'pulse',
								done: false,
							}
						]
					},
					{
						name: 'weight',
						items: [
							{
								name: 'weight',
								done: false,

							},
						]
					},
					{
						name: 'wellBeing',
						items: [
							{
								name: 'wellBeing',
								done: false,
							}
						]
					},
					{
						name: 'mood',
						items: [
							{
								name: 'mood',
								done: false,
							},
							{
								name: 'moodSwings',
								done: false
							}
						]
					},
					{
						name: 'sleep',
						items: [
							{
								name: 'hours',
								done: false,
							},
							{
								name: 'interruption',
								done: false,
							},
							{
								name: 'restful',
								done: false,
							}
						]
					},
					{
						name: 'meteorosensitivity',
						items: [
							{
								name: 'headache',
								done: false,
							},
							{
								name: 'fatigue',
								done: false,
							},
							{
								name: 'circulationProblems',
								done: false,
							},
							{
								name: 'insomnia',
								done: false,
							},
							{
								name: 'joint pain',
								done: false,
							}
						]
					},
					{
						name: 'symptoms',
						items: [
							{
								name: 'pain',
								done: false,
							},
							{
								name: 'nausea',
								done: false,
							},
							{
								name: 'vomiting',
								done: false,
							},
							{
								name: 'diarrhea',
								done: false,
							},
							{
								name: 'pyrosis',
								done: false,
							},
							{
								name: 'fatigue',
								done: false,
							},
							{
								name: 'insomnia',
								done: false,
							},
							{
								name: 'vertigo',
								done: false,
							},
							{
								name: 'appetiteLoss,',
								done: false,
							},
							{
								name: 'fingerTingling',
								done: false,
							},
							{
								name: 'memoryDisorder',
								done: false,
							}
						]
					}
				]
			})
	}



	

	return [diaryInit, editedGroups]

}

export default useTemplates;