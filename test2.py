from psonic import *
from threading import Thread
from random import choice


bpm = 50
sc = MAJOR
rhythm = 10
mood = 10
key = E5

full_scale = scale(key, sc)

query = "b 120"


def my_loop(b, s, r, m, k):
    n = random.choice(scale(k, s))
    re = random.choice([0.5, 0.25, 1])
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
        val = x[1]

        if param in "bsrmk":

            if param == 'b':
                bpm = int(val)
            elif param == 's':
                sc = val
                full_scale = scale(key, sc)
            elif param == 'r':
                rhythm = int(val)
            elif param == 'm':
                mood = int(val)
            elif param == 'k':
                key = val
                full_scale = scale(key, sc)

    query = input()


