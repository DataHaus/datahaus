export default class Storage {
  constructor(cid) {
    this.cid = cid;
    this.data = null;
  }
  read() {
    const value = localStorage.getItem(this.cid);
    if (value === null) return null;
    this.data = JSON.parse(value);
  }
  write() {
    if (this.data !== null) {
      localStorage.setItem(this.cid, JSON.stringify(this.data));
    }
  }
}
