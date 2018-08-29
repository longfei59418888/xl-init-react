'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-xl-init-react:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
