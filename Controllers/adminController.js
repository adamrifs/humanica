const admindetails = require('../Models/adminSchema')
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const addAdmin = async (req, res) => {
    try {
        const admindata = new admindetails(req.body)
        const saveddata = await admindata.save()
        console.log('New admin registered:', saveddata);

        const mailOptions = {
            from: process.env.EMAIL_USER, // Replace with your email
            to: saveddata.email,          // Admin's email
            subject: 'Welcome to Our Service',
            text: `Hello ${saveddata.name},\n\nThank you for registering! Here are your credentials:\n\nUsername: ${saveddata.name}\nEmail: ${saveddata.email}\nPassword: ${saveddata.password}\n\nPlease keep this information safe.\n\nBest regards,\nHumanica`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                // Even if email fails, we return a success response for the registration
                return res.status(200).json({
                    message: 'Admin registered successfully, but email sending failed.',
                    error: error.message
                });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({
                    message: 'Admin registered successfully and email sent!',
                    data: saveddata
                });
            }
        });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Server error during registration.');
    }
}

const getAdmin = async (req, res) => {
    try {
        const admins = await admindetails.find();
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

const getAdminDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await admindetails.findById(id);
        if (!admin) {
            return res.status(404).send('Admin not found');
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};
const specificAdmin = async (req, res) => {
    try {
        const specificgetdata = await admindetails.findById(req.param)
        res.status(200).send(specificgetdata)
        console.log('specific data ', specificgetdata)
    }
    catch (error) {
        console.log(error)
    }
}
const addWorkExperience = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { company, title, location, startdate, enddate, description } = req.body;

        // Validate input
        if (!adminId || !company || !title || !location || !startdate) {
            return res.status(400).send('Missing required fields');
        }

        // Find admin
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Add work experience
        admin.workExp.push({ company, title, location, startdate, enddate, description });
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error adding work experience:', error);
        res.status(500).send('Server error');
    }
};
//update and delete workexperience
const editWorkExperience = async (req, res) => {
    try {
        const { adminId, index } = req.params;
        const { company, title, location, startdate, enddate, description } = req.body;

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Update the specific work experience entry
        if (admin.workExp[index]) {
            admin.workExp[index] = { company, title, location, startdate, enddate, description };
            await admin.save();
            res.status(200).json(admin);
        } else {
            res.status(404).send('Work experience not found');
        }
    } catch (error) {
        console.log('Error editing work experience:', error);
        res.status(500).send('Server error');
    }
};

const deleteWorkExperience = async (req, res) => {
    try {
        const { adminId, index } = req.params;

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Remove the specific work experience entry
        if (admin.workExp[index]) {
            admin.workExp.splice(index, 1);
            await admin.save();
            res.status(200).json(admin);
        } else {
            res.status(404).send('Work experience not found');
        }
    } catch (error) {
        console.log('Error deleting work experience:', error);
        res.status(500).send('Server error');
    }
};



// adminController.js

// Add Work Experience
// const addWorkExperience = async (req, res) => {
//     try {
//         const { adminId } = req.params;
//         const { company, title, location, startdate, enddate, description } = req.body;

//         const admin = await admindetails.findById(adminId);
//         if (!admin) return res.status(404).send('Admin not found');

//         admin.workExperience.push({ company, title, location, startdate, enddate, description });
//         await admin.save();

//         res.status(200).json(admin);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error');
//     }
// };
// adminController.js

// Get Admin by ID with Work Experience
const getAdminById = async (req, res) => {
    try {
        const admin = await admindetails.findById(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');

        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        console.log(`Updating admin with ID: ${id}`);
        console.log('Update data:', updateData);

        const updatedData = await admindetails.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedData) {
            res.status(404).send('admin details not found')
        }
        res.status(200).json(updatedData)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const deletedAdmin = await admindetails.findByIdAndDelete(id);
        res.status(200).json(deletedAdmin)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('error occured')
    }
}

// education 
const addEducation = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { institution, degree, startDate, endDate, description } = req.body;

        // Validate input
        if (!adminId || !institution || !degree || !startDate) {
            return res.status(400).send('Missing required fields');
        }

        // Find admin
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Add education
        admin.education.push({ institution, degree, startDate, endDate, description });
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error adding education:', error);
        res.status(500).send('Server error');
    }
};
const editEducation = async (req, res) => {
    try {
        const { adminId, index } = req.params;
        const { institution, degree, startDate, endDate, description } = req.body;

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Update the specific education entry
        if (admin.education[index]) {
            admin.education[index] = { institution, degree, startDate, endDate, description };
            await admin.save();
            res.status(200).json(admin);
        } else {
            res.status(404).send('Education not found');
        }
    } catch (error) {
        console.log('Error editing education:', error);
        res.status(500).send('Server error');
    }
};
const deleteEducation = async (req, res) => {
    try {
        const { adminId, index } = req.params;

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Remove the specific education entry
        if (admin.education[index]) {
            admin.education.splice(index, 1);
            await admin.save();
            res.status(200).json(admin);
        } else {
            res.status(404).send('Education not found');
        }
    } catch (error) {
        console.log('Error deleting education:', error);
        res.status(500).send('Server error');
    }
};


// skills 

const addSkill = async (req, res) => {
    const { adminId } = req.params;
    const { skill, skilllevel } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        admin.skills.push({ skill, skilllevel });
        await admin.save();
        res.send(admin.skills);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error while adding skill');
    }
};

//skills edit button
const editSkill = async (req, res) => {
    const { adminId, index } = req.params;
    const { skill, skilllevel } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Update the specific skill entry
        if (admin.skills[index]) {
            admin.skills[index] = { skill, skilllevel };
            await admin.save();
            res.status(200).json(admin.skills);
        } else {
            res.status(404).send('Skill not found');
        }
    } catch (error) {
        console.log('Error editing skill:', error);
        res.status(500).send('Server error');
    }
};
const deleteSkill = async (req, res) => {
    const { adminId, index } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Remove the specific skill entry
        if (admin.skills[index]) {
            admin.skills.splice(index, 1);
            await admin.save();
            res.status(200).json(admin.skills);
        } else {
            res.status(404).send('Skill not found');
        }
    } catch (error) {
        console.log('Error deleting skill:', error);
        res.status(500).send('Server error');
    }
};


const addLanguage = async (req, res) => {
    const { language, proficiency } = req.body;
    const { adminId } = req.params;
    try {
        if (!language || !proficiency) return res.status(400).json({ message: 'All fields are required' });

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        admin.language.push({ language, proficiency });
        await admin.save();

        res.status(200).json({ message: 'Language added successfully', languages: admin.languages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const editLanguage = async (req, res) => {
    const { adminId, index } = req.params;
    const { language, proficiency } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Update the specific language entry
        if (admin.language[index]) {
            admin.language[index] = { language, proficiency };
            await admin.save();
            res.status(200).json(admin.language);
        } else {
            res.status(404).send('Language not found');
        }
    } catch (error) {
        console.log('Error editing language:', error);
        res.status(500).send('Server error');
    }
};
const deleteLanguage = async (req, res) => {
    const { adminId, index } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Remove the specific language entry
        if (admin.language[index]) {
            admin.language.splice(index, 1);
            await admin.save();
            res.status(200).json(admin.language);
        } else {
            res.status(404).send('Language not found');
        }
    } catch (error) {
        console.log('Error deleting language:', error);
        res.status(500).send('Server error');
    }
};

//certification
const addCertification = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { crname, crdate, description } = req.body;
        // const file = req.file.filename; // Assuming you're using a file upload middleware like multer

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        admin.certification.push({ crname, crdate, description });
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.error('Error adding certification:', error);
        res.status(500).send('Server error');
    }
};

const editCertification = async (req, res) => {
    const { adminId, index } = req.params;
    const { crname, crdate, description } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.certification[index]) {
            admin.certification[index] = { crname, crdate, description };
            await admin.save();
            res.status(200).json(admin.certification);
        } else {
            res.status(404).send('Certification not found');
        }
    } catch (error) {
        console.log('Error editing certification:', error);
        res.status(500).send('Server error');
    }
};

const deleteCertification = async (req, res) => {
    const { adminId, index } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.certification[index]) {
            admin.certification.splice(index, 1);
            await admin.save();
            res.status(200).json(admin.certification);
        } else {
            res.status(404).send('Certification not found');
        }
    } catch (error) {
        console.log('Error deleting certification:', error);
        res.status(500).send('Server error');
    }
};



//reference
const addReference = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { refname, refemail, refphone, refrelationship } = req.body;

        // Validate input
        if (!adminId || !refname || !refemail) {
            return res.status(400).send('Missing required fields');
        }

        // Find admin
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Add reference
        admin.reference.push({ refname, refemail, refphone, refrelationship });
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error adding reference:', error);
        res.status(500).send('Server error');
    }
};

const editReference = async (req, res) => {
    const { adminId, index } = req.params;
    const { refname, refemail, refphone, refrelationship } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.reference[index]) {
            admin.reference[index] = { refname, refemail, refphone, refrelationship };
            await admin.save();
            res.status(200).json(admin.reference);
        } else {
            res.status(404).send('Reference not found');
        }
    } catch (error) {
        console.log('Error editing reference:', error);
        res.status(500).send('Server error');
    }
};

const deleteReference = async (req, res) => {
    const { adminId, index } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.reference[index]) {
            admin.reference.splice(index, 1);
            await admin.save();
            res.status(200).json(admin.reference);
        } else {
            res.status(404).send('Reference not found');
        }
    } catch (error) {
        console.log('Error deleting reference:', error);
        res.status(500).send('Server error');
    }
};


//socail security id
const addSocialId = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { socialid } = req.body;  // Change to socialid

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        admin.socialid = socialid;  // Change to socialid
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error updating Social ID:', error);
        res.status(500).send('Server error');
    }
};

// Edit social security id
const editSocialId = async (req, res) => {
    const { adminId } = req.params;
    const { socialid } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        admin.socialid = socialid; // Update the socialid
        await admin.save();
        res.status(200).json(admin);
    } catch (error) {
        console.log('Error editing Social ID:', error);
        res.status(500).send('Server error');
    }
};
// Delete social security id
const deleteSocialId = async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) {
            return res.status(404).send('Admin not found');
        }

        admin.socialid = ''; // Remove the socialid field
        await admin.save();

        res.status(200).json({ message: 'Social Security ID deleted successfully', admin }); // Send a success message and the updated admin data
    } catch (error) {
        console.log('Error deleting Social ID:', error);
        res.status(500).send('Server error');
    }
};


//industry
const addIndustryExperience = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { industrycategory, industry } = req.body;

        // Validate input
        if (!adminId || !industrycategory || !industry) {
            return res.status(400).send('Missing required fields');
        }

        // Find admin
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        // Add industry experience
        admin.industryexp.push({ industrycategory, industry });
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error adding industry experience:', error);
        res.status(500).send('Server error');
    }
};
const editIndustryExperience = async (req, res) => {
    const { adminId, index } = req.params;
    const { industrycategory, industry } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.industryexp[index]) {
            admin.industryexp[index] = { industrycategory, industry };
            await admin.save();
            res.status(200).json(admin.industryexp);
        } else {
            res.status(404).send('Industry experience not found');
        }
    } catch (error) {
        console.log('Error editing industry experience:', error);
        res.status(500).send('Server error');
    }
};

// Delete Industry Experience
const deleteIndustryExperience = async (req, res) => {
    const { adminId, index } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.industryexp[index]) {
            admin.industryexp.splice(index, 1);
            await admin.save();
            res.status(200).json(admin.industryexp);
        } else {
            res.status(404).send('Industry experience not found');
        }
    } catch (error) {
        console.log('Error deleting industry experience:', error);
        res.status(500).send('Server error');
    }
};

//Places to work
const addPlaceToWork = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { country, region } = req.body;

        if (!adminId || !country) {
            return res.status(400).send('Missing required fields');
        }

        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        admin.placetowork.push({ country, region });
        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error adding place to work:', error);
        res.status(500).send('Server error');
    }
};
const getPlacesToWork = async (req, res) => {
    try {
        const { adminId } = req.params;
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        res.status(200).json(admin);
    } catch (error) {
        console.log('Error fetching places to work:', error);
        res.status(500).send('Server error');
    }
};

// Edit place to work
const editPlaceToWork = async (req, res) => {
    const { adminId, index } = req.params;
    const { country, region } = req.body;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.placetowork[index]) {
            admin.placetowork[index] = { country, region };
            await admin.save();
            res.status(200).json(admin.placetowork);
        } else {
            res.status(404).send('Place to work not found');
        }
    } catch (error) {
        console.log('Error editing place to work:', error);
        res.status(500).send('Server error');
    }
};

// Delete place to work
const deletePlaceToWork = async (req, res) => {
    const { adminId, index } = req.params;

    try {
        const admin = await admindetails.findById(adminId);
        if (!admin) return res.status(404).send('Admin not found');

        if (admin.placetowork[index]) {
            admin.placetowork.splice(index, 1);
            await admin.save();
            res.status(200).json(admin.placetowork);
        } else {
            res.status(404).send('Place to work not found');
        }
    } catch (error) {
        console.log('Error deleting place to work:', error);
        res.status(500).send('Server error');
    }
};


module.exports = {
    addAdmin, getAdmin, updateAdmin, deleteAdmin, specificAdmin, addEducation, getAdminDetails, addWorkExperience, getAdminById,
    addSkill, addLanguage, addCertification, addReference, addSocialId, addIndustryExperience, addPlaceToWork, getPlacesToWork,
    editWorkExperience, deleteWorkExperience, deleteEducation, editEducation, editSkill, deleteSkill, editLanguage, deleteLanguage,
    editCertification, deleteCertification, editReference, deleteReference, editSocialId, deleteSocialId, editIndustryExperience,
    deleteIndustryExperience, editPlaceToWork, deletePlaceToWork,
}