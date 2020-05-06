import fs from 'fs'
import path from 'path'
import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

jest.dontMock('fs');


describe('button', function () {
  beforeEach(() => {
    fetchMock.mockIf(/^https?:\/\/localhost*$/, req => {
      if (req.url.endsWith("graphql")) {
        return "some response body"
      } else {
        return {
          status: 404,
          body: "Not Found"
        }
      }
  })
  document.documentElement.innerHTML = html.toString()
})

  afterEach(() => {
    jest.resetModules()
  });

  it('button exists', function () {
    expect(document.querySelector('.getmore')).toBeTruthy()
  })
});
