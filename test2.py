from psonic import *
from threading import Thread
from random import choice

# global bpm
# global sc
# global rhythm
# global mood
# global key

bpm = 120
sc = MAJOR
rhythm = 10
mood = 10
key = E5

full_scale = scale(key, sc)

query = ""

def set_bpm(x):
    bpm = x
    print(bpm)

def set_sc(x):
    sc = x
    full_scale = scale(key, sc)

def set_rhythm(x):
    rhythm = x

def set_mood(x):
    mood = x

def set_key(x):
    key = x
    full_scale = scale(key, sc)

def parse_query(q):

    query = q.split(" ")
    if len(query) != 2:
        return

    param = query[0]
    val = query[1]

    if param not in "bsrmk":
        return

    if param == 'b':
        set_bpm(val)
    elif param == 's':
        set_sc(val)
    elif param == 'r':
        set_rhythm(val)
    elif param == 'm':
        set_mood(val)
    elif param == 'k':
        set_key(val)


def my_loop(b, s, r, m, k):
    n = random.choice(scale(k, s))
    re = random.choice([0.125, 0.25, 1, 2])
    play(n, release=re)
    sleep(60.0 / b)

def looper():
  while True:
    my_loop(bpm, sc, rhythm, mood, key)

looper_thread = Thread(name='looper', target=looper)

looper_thread.start()

while query != "end":
    parse_query(query)
    query = input()

