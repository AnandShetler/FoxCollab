from psonic import *
from threading import Thread
from random import choice


SCALES = {0: MAJOR,
          1: MINOR,
          2: MAJOR_PENTATONIC,
          3: MINOR_PENTATONIC,
          4: MELODIC_MAJOR,
          5: MELODIC_MINOR,
          6: MAJOR7,
          7: DORIAN,
          8: MIXOLYDIAN,
          9: IONIAN,
          10: AEOLIAN}

KEYS = {0: C5,
        1: D5,
        2: E5,
        3: F5,
        4: G5,
        5: A5,
        6: Bb5,
        7: B5}

bpm = 50
sc = SCALES[0]
rhythm = 10
mood = 10
key = KEYS[0]

full_scale = scale(key, sc)

query = "b 120"


def my_loop(b, s, r, m, k):
    n = random.choice(scale(k, s))
    re = random.choice([0.5, 0.25, 1, 2])
    play(n, release=re)
    sleep(60.0 / b)

def looper():
  while True:
    my_loop(bpm, sc, rhythm, mood, key)

looper_thread = Thread(name='looper', target=looper)

looper_thread.start()

while query != "end":
    x = query.split(" ")

    if len(x) == 2:
        param = x[0]
        val = int(x[1])

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

    query = input()


