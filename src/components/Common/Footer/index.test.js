// Link.react-test.js
import React from 'react';
import Footer from './';
import renderer from 'react-test-renderer';

test('rendered right', () => {
    const component = renderer.create(
        <Footer />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});