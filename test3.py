from psonic import *
from threading import Thread

note = 60

def my_loop(x):
  play(x)
  sleep(1)

def looper():
  while True:
    my_loop(note)

looper_thread = Thread(name='looper', target=looper)

looper_thread.start()


while note != 0:
    note = input()