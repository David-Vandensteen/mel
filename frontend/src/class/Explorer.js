import axios from 'axios';
import config from '../config';

export default class Explorer {
  get (path) {
    return axios.request({
      method: 'post',
      url: `${config.backend.route}/folder`,
      data: {
        folder: path,
      },
    })
      .then((response) => {
        const pathSplit = path.split('\\');
        const parentPath = pathSplit.slice(0, pathSplit.length - 1).join('\\');
        response.data.push({ directory: true, name: '..', path: parentPath });
        return response.data
      });
  }

  static trunk (items, hover, frame) {
    const begin = (hover - frame + items.length) % items.length;
    const itemsTrunked = [];
    if (items.length === 0) return itemsTrunked;
    for (let i = 0; i < (frame *2) + 1; i +=1 ) {
      const index = (begin + i) % items.length;
      if (items[index]) itemsTrunked.push(items[index]);
    }
    return itemsTrunked;
  }
}