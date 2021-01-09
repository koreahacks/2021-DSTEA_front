import { v4 as uuidv4 } from 'uuid';

/* eslint-disable import/prefer-default-export */
/**
 * @param {Number[][]} d path의 각 점의 정보 ex) [[0, 0], [10, 10], [30, 50]]
 * @param attrs path의 d를 제외한 다른 정보 ex) stroke-width
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

export class Path {
  constructor({ d, ...attrs }) {
    this.attrs = attrs;
    if (!Object.keys({...attrs}).includes('id')) {
      this.id = uuidv4();
    } else {
      this.id = attrs.id;
    }
    if (d) {
      this.commands = d;
    } else {
      this.commands = [];
    }
  }
  /**
   * get command string ex) M 1,1 L 2,2 L 3,3 z
   */
  getCommandString() {
    if (this.commands.length === 0) {
      return '';
    }
    return this.commands.reduce((prev, coord, index) => {
      if (index === 0) {
        return `${prev}M ${coord[0]},${coord[1]} `;
      }
      return `${prev}L ${coord[0]},${coord[1]} `;
    }, '');
  }
  pushPoint(point) {
    this.commands.push(point);
  }
  /**
   * delete command
   */
  deleteCommand() {
    this.commands = [];
  }
  toPath() {
    const path = document.createElementNS(SVG_NS, 'path');
    const attrs = {
      ...this.attrs,
      d: this.getCommandString(),
      id: this.id,
    }
    Object.keys(attrs)
      .sort()
      .map((key) => {
        path.setAttribute(key, attrs[key]);
      });
    return path;
  }
}

// p = new Path({d: [[1, 1], [2, 2], [3, 3]]});
// console.log(p.getCommandString());
// p.pushPoint([4, 4]);
// console.log(p.getCommandString());

class SVG {
  constructor({width, height, ...opt}) {
    this.width = width;
    this.height = height;
    this.paths = [];
    this.opt = {
      stroke: opt.stroke || 'rgb(0, 0, 0)',
      fill: 'none',
      'stroke-linejoin': 'round',
      'stroke-width': opt['stroke-width'] || 5,
    };
  }
  /**
   * 
   * @param {Path} path 추가할 path
   */
  pushPath(path) {
    this.paths.push(path);
  }
  popPath() {
    this.paths.pop();
  }
  scale(r) {
    console.log(`scale by ${r}, tbd`);
  }
  toPaths(id) {
    const g = document.createElementNS(SVG_NS, 'g');
    if (id !== null || id !== undefined) {
      g.setAttribute('id', String(id));
    }
    this.paths.forEach((p) => {
      g.appendChild(p.toPath());
    });
    return g;
  }
  setOpt(opt) {
    this.opt = {
      ...this.opt,      
      ...opt,
    };
  }
}

class Render extends SVG {
  constructor(parent, id, opt = {}) {
    const { width, height, left, top } = parent.getBoundingClientRect();
    super({ width, height, ...opt });
    this.id = id;
    this.parent = parent;
    this.left = left;
    this.top = top;
    // parent.appendChild(this.toPaths(this.id));
  }
  update() {
    console.log('update', this.id);
    this.parent.replaceChild(this.toPaths(this.id), this.parent.getElementById(this.id));
  }
  delete() {
    const target = this.parent.getElementById(this.id);
    console.log(target);
    if (target) {
      target.remove();
    }
  }
  create() {
    console.log(this.toPaths(this.id));
    this.parent.appendChild(this.toPaths(this.id));
  }
  reSize() {
    const { width, height, left, top } = this.parent.getBoundingClientRect()
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
  }
}

export class SVGDrawing extends Render {
  constructor(parent, id, opt = {}, sender) {
    super(parent, id, opt);
    this.parent = parent;

    this.handleStart = this.handleStart.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.throttledrawMove = throttle(this.drawMove, 20);

    this.sender = sender;
    this.currentPaths = {};
  }
  off() {
    if (this.clearMouseListener) {
      this.clearMouseListener();
      this.clearMouseListener = null;
    }
    if (this.clearTouchListener) {
      this.clearTouchListener();
      this.clearTouchListener = null;
    }
  }
  on() {
    this.off()
    this.setupMouseEventListener();
    if ('ontouchstart' in window) {
      this.setupTouchEventListener()
    }
  }

  setupMouseEventListener() {
    this.parent.addEventListener('mousedown',this.handleStart);
    this.parent.addEventListener('mousemove',this.handleDraw);
    this.parent.addEventListener('mouseleave',this.handleEnd);
    // this.parent.addEventListener('mouseout', this.handleEnd);
    window.addEventListener('mouseup', this.handleEnd);

    this.clearMouseListener = () => {
      this.parent.removeEventListener('mousedown', this.handleStart)
      this.parent.removeEventListener('mousemove', this.handleDraw)
      this.parent.removeEventListener('mouseleave', this.handleEnd)
      // this.parent.removeEventListener('mouseout', this.handleEnd)
      window.removeEventListener('mouseup', this.handleEnd)
    }
  }
  setupTouchEventListener() {
    this.parent.addEventListener('touchstart',this.handleStart);
    this.parent.addEventListener('touchmove',this.handleTouch);
    this.parent.addEventListener('touchend',this.handleEnd);
    window.addEventListener('touchcancel', this.handleEnd);

    this.clearTouchListener = () => {
      this.parent.removeEventListener('touchstart', this.handleStart)
      this.parent.removeEventListener('touchmove', this.handleTouch)
      this.parent.removeEventListener('touchend', this.handleEnd)
      window.removeEventListener('touchcancel', this.handleEnd)
    }
  }
  handleStart(e) {
    e.preventDefault();
    this.reSize();
    this.drawStart();
  }
  handleDraw(e) {
    e.preventDefault();
    this.throttledrawMove(e.clientX, e.clientY);
  }
  handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.throttledrawMove(touch.clientX, touch.clientY);
  }
  handleEnd(e) {
    e.preventDefault();
    this.drawEnd();
  }
  drawStart(pathId, isSend = true) {
    const pathInfo = {
      fill: "none",
      ...this.opt,
    };
    if (pathId === undefined || pathId === null) {
      this.currentPath = new Path(pathInfo);
      this.pushPath(this.currentPath);
    } else {
      pathInfo.id = pathId;
      this.currentPaths[pathId] = new Path(pathInfo);
      this.pushPath(this.currentPaths[pathId]);
    }

    if (!isSend) return;
    const path_id = pathId === undefined || pathId === null ? this.currentPath.id : pathId;

    // drawing start
    this.sendSocket({
      status: "start",
		  path_id,
		  is_public: true,
		  page: this.id,
		  attr : {
		  	...this.opt,
	    }
		});
  }

  drawMove(x, y, pathId, isSend = true) {
    if (!this.currentPath) return;
    const position = [x - this.left, y - this.top];
    if (pathId === undefined || pathId == null) {
      this.currentPath.pushPoint(position);
    } else {
      this.currentPaths[pathId].pushPoint(position);
    }
    this.update();

    if (!isSend) return;
    // drawing...
    const path_id = pathId === undefined || pathId === null ? this.currentPath.id : pathId;
    this.sendSocket({
      status: "draw",
		  path_id,
		  pos: [position[0] / this.width, position[1] / this.height],
		});
  }

  drawEnd(pathID = undefined, isSend) {
    if (pathID === undefined && (this.currentPath === undefined || this.currentPath === null)) return;
    else if (pathID !== undefined && this.currentPaths[pathID] === undefined) return;
    const path_id = pathID === undefined || pathID === null ? this.currentPath.id : pathID;

    if (isSend) {
      this.sendSocket({
        status: "end",
        path_id,
        pos: this.currentPath.commands,
      });
    }
    if (pathID === undefined || pathID === null) {
      this.currentPath = null;
    } else {
      delete this.currentPaths[pathID];
    }
    this.update();
  }
  sendSocket(data) {
    console.log(data);
    this.sender.current.write.send(JSON.stringify(data));
  }
}

export class SVGDrawings {
  constructor(parent, maxIndex, currIndexs = {'rendering': [0], 'writing': 0}, opt = {}, socketOpt = {boardURL: '', sessionID: ''}) {
    this.sender = new Sender(socketOpt);
    // this.sender.setEvent('write', 'send');

    this.renderingIndexs = currIndexs['rendering'];
    this.writingIndex = currIndexs['writing'];
    this.maxIndex = maxIndex;
    this.SVGs = [];
    for (let i = 0; i < this.maxIndex; i += 1) {
      this.SVGs.push(new SVGDrawing(parent, `${i}`, opt, this.sender));
    }

    this.renderingIndexs.forEach((i) => {
      this.SVGs[i].delete();
      this.SVGs[i].create();
    });
    if (this.writingIndex !== null) {
      this.SVGs[this.writingIndex].on();
    }
    this.sender.current.write.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const { status, path_id, page, pos } = data;
      if (status === 'start') {
        const { page } = data;
        this.SVGs[page].drawStart(path_id, false);
      } else if (status === 'draw') {
        this.SVGs[page].drawMove(pos[0] * this.SVGs[page].width, pos[1] * this.SVGs[page].height, path_id, false);
      } else if (status === 'end') {
        this.SVGs[page].drawEnd(path_id, false);
      } else {
        console.log(`error on ${status}`);
      }
    };
  }
  setRenderingIndex(index) {
    const deleteIndex = this.renderingIndexs; // .filter((i) => !index.includes(i));
    const createIndex = index; // .filter((i) => !this.renderingIndexs.includes(i))
    deleteIndex.forEach((i) => {
      this.SVGs[i].delete();
    });
    createIndex.forEach((i) => {
      this.SVGs[i].create();
    });
    this.renderingIndexs = index;
  }
  setWritingIndex(index) {
    if (this.writingIndex === index) return;
    if (this.writingIndex !== null) {
      this.SVGs[this.writingIndex].off();
    }
    this.writingIndex = index;
    if (index !== null) {
      this.SVGs[index].delete();
      this.SVGs[index].create();
      this.SVGs[index].on();
    }
  }
  setOpt(opt) {
    for (let i = 0; i < this.maxIndex; i += 1) {
      this.SVGs[i].setOpt(opt);
    }
  }
  getIndex() {
    console.log('current write:', this.writingIndex);
    console.log('current render:', this.renderingIndexs);
  }
}

export class Sender {
  constructor({boardID, sessionID}) {
    console.log(boardID, sessionID);
    this.baseURL = 'ws://127.0.0.1:8000';
    this.current = {
      write: new WebSocket(`${this.baseURL}/write/${boardID}/${sessionID}`),
    };
  }
  //       // delete: new WebSocket(`${this.baseURL}/delete/`),
  write(data) {
    this.current.write.write(JSON.stringify(data));
  }
  setEvent(type, callbackName, callback) {
    this.current[type][callbackName] = callback;
  }
}

function throttle(func, wait, options = {}) {
  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;

  const later = () => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = null;
      args = null;
    }
  }

  const stop = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  return function wrap() {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      stop()
      previous = now
      result = func.apply(context, args)
      if (!timeout) {
        context = null
        args = null
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result;
  }
}