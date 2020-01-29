import axios from 'axios';
import config from '../config';

export default class Explorer {
  get (path) {
    return axios.get(`${config.backend.route}/folder/${path}`)
      .then((response) => response.data);
  }

  static trunk (items, hover, frame) {
    const begin = (hover - frame + items.length) % items.length;
    const itemsTrunked = [];
    if (items.length === 0) return itemsTrunked;
    for (let i = 0; i < (frame *2) + 1; i +=1 ) {
      itemsTrunked.push(items[(begin + i) % items.length ]);
    }
    return itemsTrunked;
  }
}