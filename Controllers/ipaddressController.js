const ipaddress = require('../Models/ipaddressSchema')

const addIp = async (req, res) => {
    try {
        const { ip, date, country } = req.body; 
        const ipdata = new ipaddress({
            ip,
            date: new Date(date),
            country 
        });
        console.log("IpData", ipdata);

        await ipdata.save()
        res.status(200).send('ip address saved succesfull')
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Failed to save IP address and country');
    }
}

const getIp = async (req, res) => {
    try {
        const ipDetails = await ipaddress.find()
        res.status(200).send(ipDetails)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Failed to retrieve IP addresses' });
    }
}

module.exports = { addIp, getIp }