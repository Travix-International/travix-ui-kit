import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
