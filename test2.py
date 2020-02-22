from psonic import *
from threading import Thread
from random import choice

SCALES = {0: MAJOR,
          1: MAJOR_PENTATONIC,
          2: MELODIC_MAJOR,
          3: MAJOR7,
          4: DORIAN,
          5: MINOR,
          6: MINOR_PENTATONIC,
          7: MELODIC_MINOR,
          8: MIXOLYDIAN,
          9: IONIAN,
          10: AEOLIAN}

KEYS = {0: C4,
        1: D4,
        2: E4,
        3: F4,
        4: G4,
        5: A4,
        6: Bb4,
        7: B4}

bpm = 120
scaled_bpm = 120
sc = SCALES[0]
rhythm = 10
mood = 10
key = KEYS[0]
scaled_key = key

full_scale = scale(key, sc)

query = "b 120"


def drum_loop(b, s, r, m, k):
    if one_in(2):
        sample(DRUM_HEAVY_KICK)
        # sleep(60.0 / b)
    else:
        if one_in(2):
            sample(DRUM_SNARE_HARD)
    sample(DRUM_CYMBAL_CLOSED)
    sleep(30.0 / b)


def lead_loop(b, s, r, m, k):
    n = random.choice(scale(k, s))
    re = random.choice([1])
    play(n, release=re)
    sleep(60.0 / b)


def lead_looper():
    while True:
        lead_loop(scaled_bpm, sc, rhythm, mood, key)


def drum_looper():
    while True:
        drum_loop(scaled_bpm, sc, rhythm, mood, key)


looper_thread = Thread(name='lead_looper', target=lead_looper)
drum_thread = Thread(name='drum_looper', target=drum_looper)

looper_thread.start()
drum_thread.start()

while query != "end":
    x = query.split(" ")

    if len(x) == 2:
        param = x[0]
        val = float(x[1])

        if param in "bsrmk":

            if param == 'b':
                bpm = val
            elif param == 's':
                if (val >= 0 and val < len(SCALES)):
                    sc = SCALES[val]
                    full_scale = scale(key, sc)
            elif param == 'r':
                rhythm = val
            elif param == 'm':
                mood = val
            elif param == 'k':
                if (val >= 0 and val < len(KEYS)):
                    key = KEYS[int(val)]
                    full_scale = scale(key, sc)

            scaled_bpm = bpm + (10 * (mood - 5))
            scaled_key = 0




    query = input()
