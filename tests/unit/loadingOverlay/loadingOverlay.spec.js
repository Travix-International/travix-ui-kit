import { shallow } from 'enzyme';
import React from 'react';
import LoadingOverlay from '../../../components/loadingOverlay/loadingOverlay';

describe('LoadingOverlay', () => {
  describe('#render()', () => {
    it('render basic loading overlay', () => {
      const wrapper = shallow(
        <LoadingOverlay>
          Some data
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with custom class', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class">
          Some data
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with transparency', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" transparency>
          Some data
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay in loading mode', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading>
          Data is loading...
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with transparency in loading mode', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading transparency>
          Data is loading... You can see that message.
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with left message direction', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading messageDirection="left">
          Data is loading...
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render loading overlay with loading message', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading message="Loading your data...">
          Data is loading...
        </LoadingOverlay>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('render without spinner', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading spinner={false}>
          Data is loading...
        </LoadingOverlay>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('render without children - should return null', () => {
      const wrapper = shallow(
        <LoadingOverlay className="my-custom-class" loading message="Loading your data..." />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
