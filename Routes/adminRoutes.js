const express = require('express')
const router = express.Router()
const adminController = require('../Controllers/adminController')

router.post('/addAdmin', adminController.addAdmin)
router.get('/getAdmin', adminController.getAdmin)
router.put('/updateAdmin/:id', adminController.updateAdmin)
router.delete('/deleteAdmin/:id', adminController.deleteAdmin)
router.get('/specificAdmin/:id', adminController.specificAdmin)
router.get('/getAdminDetails/:id', adminController.getAdminDetails);
router.get('/getAdminById/:id', adminController.getAdminById);
router.post('/addWorkExperience/:adminId', adminController.addWorkExperience);
router.post('/addEducation/:adminId', adminController.addEducation)
router.post('/addSkill/:adminId', adminController.addSkill)
router.post('/addLanguage/:adminId', adminController.addLanguage)
router.post('/addCertification/:adminId', adminController.addCertification)
router.post('/addReference/:adminId', adminController.addReference)
router.post('/addSocialId/:adminId', adminController.addSocialId)
router.post('/addIndustryExperience/:adminId', adminController.addIndustryExperience)
router.post('/addPlaceToWork/:adminId', adminController.addPlaceToWork)
router.get('/getPlacesToWork/:adminId', adminController.getPlacesToWork)
// router.post('/changePassword/:id', adminController.changePassword)
router.post('/changePassword/:userId', adminController.changePassword);




router.put('/editWorkExperience/:adminId/:index', adminController.editWorkExperience);
router.delete('/deleteWorkExperience/:adminId/:index', adminController.deleteWorkExperience);
router.put('/editEducation/:adminId/:index', adminController.editEducation);
router.delete('/deleteEducation/:adminId/:index', adminController.deleteEducation);
router.put('/editSkill/:adminId/:index', adminController.editSkill);
router.delete('/deleteSkill/:adminId/:index', adminController.deleteSkill);
router.put('/editLanguage/:adminId/:index', adminController.editLanguage);
router.delete('/deleteLanguage/:adminId/:index', adminController.deleteLanguage);
router.put('/editCertification/:adminId/:index', adminController.editCertification); // Edit certification route
router.delete('/deleteCertification/:adminId/:index', adminController.deleteCertification);
router.put('/editReference/:adminId/:index', adminController.editReference);
router.delete('/deleteReference/:adminId/:index',adminController.deleteReference);
router.put('/editSocialId/:adminId', adminController.editSocialId);
router.delete('/deleteSocialId/:adminId', adminController.deleteSocialId);
router.put('/editIndustryExperience/:adminId/:index', adminController.editIndustryExperience);
router.delete('/deleteIndustryExperience/:adminId/:index', adminController.deleteIndustryExperience);
router.put('/editPlaceToWork/:adminId/:index', adminController.editPlaceToWork);
router.delete('/deletePlaceToWork/:adminId/:index', adminController.deletePlaceToWork);

module.exports = router