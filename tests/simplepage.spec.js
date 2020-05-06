import fs from 'fs'
import path from 'path'
import '@testing-library/jest-dom'

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

jest
    .dontMock('fs');

describe('button', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });

    it('button exists', function () {
        expect(document.getElementById('disable')).toBeTruthy();
    });
});
