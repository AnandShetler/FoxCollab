const BPM_CHANGE_VALUE = 10
const RYTHMIC_CHANGE_VALUE = 10
const MOOD_CHANGE_VALUE = 10

const _KEYS = `C4,D4,E4,F4,G4,A4,Bb4,B4`.split(',')
const _SCALES = 'Major,Minor,Major Pentatonic,Minor Pentatonic,Melodic Major,Melodic Minor,Major7,Dorian,Mixolydian,Ionian,Aeolian'.split(',')

module.exports = {
    DEFAULT_STATE: {
        bpm: 120,
        scale: 'Major',
        rythmic: 1,
        mood: 1,
        key: "C4"
    },
    reducers: {
        'change.bpm.up': {
            keywords: ['higher bpm', 'faster', 'too slow'],
            interact: state => state.bpm += BPM_CHANGE_VALUE
        },
        'change.bpm.down': {
            keywords: ['lower bpm', 'slower', 'too fast'],
            interact: state => state.bpm -= BPM_CHANGE_VALUE
        },
        'change.rythmic.up': {
            keywords: ['more rythmic'],
            interact: state => state.rythmic += RYTHMIC_CHANGE_VALUE
        },
        'change.rythmic.down': {
            keywords: ['less rythmic'],
            interact: state => state.rythmic -= RYTHMIC_CHANGE_VALUE
        },
        'change.mood.up': {
            keywords: ['more mood', 'moodier'],
            interact: state => state.mood += MOOD_CHANGE_VALUE
        },
        'change.mood.down': {
            keywords: ['calmer', 'less mood'],
            interact: state => state.mood -= MOOD_CHANGE_VALUE
        },
        ...keyBuilder(),
        ...scaleBuilder()
    }
}

function keyBuilder() {
    let b = {}
    for(let key in _KEYS)
        b[`change.key.` + key.toLowerCase()] = {
            keywords: ['key ' + key.toLowerCase()],
            interact: state => state.key = key
        }
        return b
}
function scaleBuilder() {
    let b = {}
    for(let scale in _SCALES)
        b[`change.scale.` + scale.toLowerCase()] = {
            keywords: ['scale ' + scale.toLowerCase()],
            interact: state => state.scale = scale
        }
        return b
}