const work = require('../Models/workSchema')

const addwork = async (req, res) => {
    try {
        const { date, fromTime, toTime, breakTime, notes } = req.body
        const workdata = new work({
            date,
            fromTime,
            toTime,
            breakTime,
            notes
        })
        await workdata.save()
        res.status(200).send('work data saved succesfull')
    }
    catch (error) {
        console.log(error)
    }
}

const getwork = async (req, res) => {
    try {
        const workdata = await work.find()
        res.status(200).send(workdata)
    }
    catch (error) {
        console.log(error)
    }
}
const updatework = async (req, res) => {
    try {
        const { date, fromTime, toTime, breakTime, notes } = req.body
        const { id } = req.params
        console.log(id,req.body,
            'edit id'
        );
        
        const updatedwork = await work.findByIdAndUpdate(id, {
            date,
            fromTime,
            toTime,
            breakTime,
            notes
        }, { new: true })
        if (!updatedwork) {
            res.status(404).json({ message: 'product not found' })
        }
        res.json(updatedwork)
    }
    catch (error) {
        res.status(500).json({ message: 'error updating ' }, error)
    }
}

const deletework = async (req, res) => {
    try {
        const { id } = req.params
        const deletedwork = await work.findByIdAndDelete(id)
        if (!deletedwork) {
            return res.status(404).send('Work item not found');
        }
        res.status(200).send('deleted succesfully')
    }
    catch (error) {
        console.log('error occured while deleting', error)
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { addwork, getwork, updatework, deletework }