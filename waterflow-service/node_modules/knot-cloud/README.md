# KNoT Cloud library for Node.js

A client side library that provides access to the KNoT Cloud for Node.js applications.

# Fork knot-lib-node

It's fork repository https://github.com/CESARBR/knot-lib-node

# Getting started

## Install

While it isn't available through NPM:

Then, in your project root:

```
"dependencies":{
  "knot-cloud": "git+https://github.com/cassiolpaixao90/knot-lib-node.git"
}

npm i knot-cloud
```

## Quickstart

`KNoTCloud` connects to http://host:port using the UUID and token as credentials, respectively. Replace this address with your cloud instance and the credentials with valid ones.

```
const KNoTCloud = require('knot-cloud');
const cloud = new KNoTCloud(
  'knot-test.cesar.org.br',
  3000,
  '78159106-41ca-4022-95e8-2511695ce64c',
  'd5265dbc4576a88f8654a8fc2c4d46a6d7b85574',
);

async function main() {
  try {
    await cloud.connect();
    const devices =  await cloud.getDevices();
    console.log(devices);
  } catch (err) {
    console.error(err);
  }

  await cloud.close();
}
main();
```
