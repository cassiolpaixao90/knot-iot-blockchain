
const KNoTCloud = require('knot-cloud');
const cloud = new KNoTCloud(
    'knot-test.cesar.org.br',
    3000,
    'fbd2f4b2-1ef9-41fe-9456-a42550d90000',
    '042ffc190cbeb4e77176eff4f7064ad74f6844dc'
);

async function main() {
    try {
        await cloud.connect();
        const devices = await cloud.getDevices();
        console.log("devices", devices);
    } catch (err) {
        console.error(err);
    }

    await cloud.close();
}
export { main }