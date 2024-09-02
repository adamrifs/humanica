const ipaddress = require('../Models/ipaddressSchema')

const addIp = async (req, res) => {
    try {
        const { ip, date } = req.body
        const ipdata = new ipaddress({ ip, date })
        console.log("IpData", ipdata);

        await ipdata.save()
        res.status(200).send('ip address saved succesfull')
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { addIp }