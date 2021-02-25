import React from 'react';
import TweetTable from '../components/TweetTable.js';
import { create } from 'react-test-renderer'

describe('Basic snapshot test',()=>{
    test('testing tweet table', () => {
    let tree = create(<TweetTable />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})