
const KNoTCloud = require('knot-cloud');
const cloud = new KNoTCloud(
    'knot-test.cesar.org.br',
    3000,
    'fdf6cbee-1a70-4099-8285-1e300a8a0000',
    '1c698e0cb986d279855ff7653428fe83c8b39cac'
);

async function start() {
    try {
        await cloud.connect();
        const devices = await cloud.getDevices();
        console.log("devices", devices);
    } catch (err) {
        console.error(err);
    }

    await cloud.close();
}

export { start }