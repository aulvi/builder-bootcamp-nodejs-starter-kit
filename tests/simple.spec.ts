import { expect } from 'chai';
import { handler } from '../src/simple';

describe('Tests index', function () {
  it('verifies successful response', async () => {
    const result = await handler({});

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');

    const response = JSON.parse(result.body);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('hello simple world!');

    expect(true).to.be.true;
  });
});
