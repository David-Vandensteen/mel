from __future__ import print_function
from inputs import get_gamepad

import requests

def kill():
  url = 'http://localhost:3000/emulators/kill'
  x = requests.get(url)

def main():
  start = 0
  select = 0
  while 1:
    events = get_gamepad()
    for event in events:
      '''print(event.ev_type, event.code, event.state)'''
      if event.ev_type == 'Key' and event.code == 'BTN_SELECT':
        select = event.state
      if event.ev_type == 'Key' and event.code == 'BTN_START':
        start = event.state
      if start and select:
        kill()

if __name__ == "__main__":
  main()
