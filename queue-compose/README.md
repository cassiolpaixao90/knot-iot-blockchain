# Queue RabbitMQ IoT

Delayed messages sent to RabbitMQ of device IoT.

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

## The problem

Delayed messages sent to RabbitMQ.

## This solution

Docker image of RabbitMQ with management and compatible version of the delayed message exchange plugin.

## Pré-requisites

- Docker-Compose

## Installation

### Steps to setup

**1. Clone the application**

```bash
git clone https://github.com/cassiolpaixao90/node-microservice-blockchain-iot-knot.git
```

**2. Run Application**

```bash
cd queue-compose
docker-compose up
```

## Usage

```bash
- RABBITMQ_DEFAULT_USER=YOUR_USER
- RABBITMQ_DEFAULT_PASS=YOUR_PASSWORD
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars3.githubusercontent.com/u/16453864?s=400&v=4" width="100px;"/><br /><sub>Cássio Paixão</sub>]()<br />[💻]() [📖]() [⚠️]() |
| :----------------------------------------------------------------------------------------------------------------------------------------------------:

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## LICENSE

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/cassiolpaixao90/node-microservice-blockchain-iot-knot/blob/master/device-fake-service/LICENSE) file for details

[build-badge]: https://img.shields.io/buildkite/3826789cf8890b426057e6fe1c4e683bdf04fa24d498885489/master.svg
[build]: ""
[coverage-badge]: https://img.shields.io/sonar/http/sonar.petalslink.com/org.ow2.petals%3Apetals-se-ase/coverage.svg
[coverage]: ""
[downloads-badge]: ""
[npm-stat]: ""
[license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[license]: https://github.com/cassiolpaixao90/node-microservice-blockchain-iot-knot/blob/master/device-fake-service/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/cassiolpaixao90/node-microservice-blockchain-iot-knot/blob/master/device-fake-service/CODE_OF_CONDUCT.md
[umd]: https://github.com/umdjs/umd
[npmcdn]: https://npmcdn.com
