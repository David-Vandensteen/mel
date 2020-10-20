from __future__ import print_function
from importlib import reload

import os
import requests
import time
import inputs

def kill():
  url = 'http://localhost:' + os.environ['MEL_BACK_PORT'] + '/emulators/kill'
  requests.get(url)

def main():
  start = 0
  select = 0
  while 1:
    try:
     events = inputs.get_gamepad()
    except:
      print('Gamepad is not connected')
      print('retry...')
      time.sleep(10)
      reload(inputs)
      os.system('cls')
      main()

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
