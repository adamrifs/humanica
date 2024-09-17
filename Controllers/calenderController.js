const calender = require('../Models/calenderSchema')

const adddata = async (req, res) => {
    try {
        const {
            date, type, fromTime, toTime, available, fromDate, toDate, notes
        } = req.body;

        const calenderEntry = new calender({
            date,
            type,
            fromTime: type === 'availability' ? fromTime : undefined,
            toTime: type === 'availability' ? toTime : undefined,
            fromDate: type === 'vacation' ? fromDate ? new Date(fromDate) : undefined : undefined,
            toDate: type === 'vacation' ? toDate ? new Date(toDate) : undefined : undefined,
            available: type === 'availability' ? available : undefined,
            notes
        });

        await calenderEntry.save();
        res.status(201).json(calenderEntry);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ message: 'Failed to save data' });
    }
}

const getdata = async (req, res) => {
    const { date } = req.query; 
    try {
        const calenderData = await calender.findOne({ date });
        if (!calenderData) {
            return res.status(404).send({ message: 'Data not found for the specified date' });
        }
        res.status(200).send(calenderData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// In your backend file

const getDatesWithData = async (req, res) => {
    try {
        const entries = await calender.find({});
        const dates = entries.map(entry => entry.date);
        res.status(200).json(dates);
    } catch (error) {
        console.error('Error fetching dates with data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { adddata, getdata, getDatesWithData };
