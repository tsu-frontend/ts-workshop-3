function fn() {
  fn.bind(this);
  console.log(this);
}
fn();
const fnArr = () => {
  this.fnM = () => {};
  console.log(this);
};
fnArr();

class MyClass {
  constructor() {
    this.name = "name";
    const surname = 'lastname'
  }
}
