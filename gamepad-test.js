const gamepad = new Gamepad();
let start = 0;
let select = 0;

gamepad.on('connect', e => {
    console.log(`controller ${e.index} connected!`);
});

gamepad.on('disconnect', e => {
  console.log(`controller ${e.index} disconnected!`);
});

gamepad.on('press', 'button_1', () => {
  console.log('button 1 was pressed!');
});

gamepad.on('hold', 'button_1', () => {
  console.log('button 1 is being held!');
});

gamepad.on('release', 'button_1', () => {
  console.log('button 1 was released!');
});

gamepad.on('press', 'start', () => {
  console.log('button start was pressed!');
  start = 1;
  if (select === 1) console.log('start and select was pressed');
});

gamepad.on('press', 'select', () => {
  console.log('button select was pressed!');
  if (start === 1) console.log('start and select was pressed');
  select = 1;
});

gamepad.on('release', 'start', () => {
  console.log('button start was released!');
  start = 0;
});

gamepad.on('release', 'select', () => {
  console.log('button select was released!');
  select = 0;
});
