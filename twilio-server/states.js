const BPM_CHANGE_VALUE = 50

module.exports = {
    DEFAULT_STATE: {
        bpm: 120,
        scale: 'major',
        rythmic: 1,
        mood: 1,
        key: "C"
    },
    reducers: {
        'change.bpm.up': {
            keywords: ['higher bpm', 'faster', 'too slow'],
            interact: state => state.bpm += BPM_CHANGE_VALUE
        },
        'change.bpm.down': {
            keywords: ['lower bpm', 'slower', 'too fast'],
            interact: state => state.bpm -= BPM_CHANGE_VALUE
        }
    }
}