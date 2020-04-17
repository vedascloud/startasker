const Customers = require('../../app/Models/Customers');
const CustomersSettings = require('../../app/Models/CustomerSettings');
const PostJob = require('../../app/Models/PostJob');
const bcrypt = require('bcryptjs');

var CustomersDBQueries = {
    getCustomerQuery:(params) => {
        var query = { 
            $or: [{ 
                    userID: { $regex: params.userID, $options: 'i' } 
                    }] 
                    }
        return Customers.findOne(query, {_id: 0, __v: 0}).exec()
    
    },
    getAggreateQuery:(userID) => {
        return Customers.aggregate([
            {
                $match: {
                    userID: new RegExp('^' + userID + '$', "i")
                }
            },
            {
                $lookup: {
                    from: "settings",
                    localField: "userID",
                    foreignField: "userID",
                    as: "Settings"
                }
            }
        ]).exec()
    },
    getUserQueryFromUserId:(userID) => {
        var query = { 
            $or: [{ 
                    userID: { $regex: userID, $options: 'i' }},{
                        'Facebook.facebookID':{$regex: userID, $options: 'i'}
                    } 
                    ] 
                    }
        return Customers.findOne(query,{_id: 0, __v: 0}).exec()
    },

    prepareUserUpdate:(userID, isVerified) => {
        return Customers.updateOne({ userID: new RegExp(userID, 'i') }, {
            $set: {
                verification_status: isVerified,
            }
        }).exec()
    },
    prepareForgotPasswordOTPUpdate:(userID, otp) => {
        const otp_req_time = new Date().getTime().toString();
        return Customers.updateOne({ userID: new RegExp('^' + userID + '$', "i")},
        {
            $set: {
                otp: otp,
                otp_time: otp_req_time
            }
        }).exec()
    },
    newCustomerInsertQuery:(params,otp) => {
        let hashedPassword = bcrypt.hashSync(params.password, 8);
          
        const register_timestamp = new Date().getTime().toString();
            let customer =  new Customers({ 
                userID: params.userID,
                password: hashedPassword,
                otp: otp,
                otp_time: register_timestamp,
                register_type: params.register_type,
                register_time: register_timestamp,                

            })

            return customer;
        
    },
    unVerifiedCustomerQuery:(params, otp) => {
        let hashedPassword = bcrypt.hashSync(params.password, 8);
        const register_timestamp = new Date().getTime().toString()
        return Customers.updateOne({ userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                userID: params.userID,
                password: hashedPassword,
                otp: otp,
                otp_time: register_timestamp,
                register_type: params.register_type,
                register_time: register_timestamp,

            }
        }).exec()
    },
    customerInfoUpdateQuery:(params,imageName) => {      
       
        return Customers.updateOne({ userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                firstName: params.firstName,
                lastName: params.lastName,
                loc: [params.latitude,params.longitude],
                postTask: params.postTask,
                completeTask: params.completeTask,
                address: params.address,
                phoneNumber: params.phoneNumber,
                profilePic: imageName,
                isProfileUpdate: true

            }
        }).exec()
    },
    getCustomersDeleteQuery:(userID) => {
       
        return Customers.deleteOne({ userID: new RegExp(userID, 'i') }).exec()
    },

    getUpdateForResetPassword:(userID, newPassword) =>{
        return Customers.updateOne({ userID: new RegExp(userID, 'i') }, {
            $set: {
                password: newPassword,
            }
        }).exec()
    },
    getFacebookNewCustomerInsertQuery:(params) => {
        let password = 'startasker';
        let hashedPassword = bcrypt.hashSync(password, 8);
        let Facebook = {
            facebookID : params.ID,
            tokenId: params.tokenID
        }
        var userID;
        if(params.userID !== ''){
            userID = params.userID 
        }else{
            userID = params.ID
        }
        
        const register_timestamp = new Date().getTime().toString()
            let customer =  new Customers({ 
                userID: userID,
                password: hashedPassword,
                otp: 'startasker',
                register_type: params.register_type,
                register_time: register_timestamp,   
                Facebook: Facebook,
                firstName: params.firstName,
                lastName: params.lastName,
                loc: [params.latitude,params.longitude],
                verification_status: true,
                profilePic: params.profilePic            

            })

            return customer;
        
    },
    getFaceBookIDQuery : (params) => {
        return Customers.findOne({ 'Facebook.facebookID': new RegExp('^' + params.ID + '$', "i") },{_id: 0, __v: 0}).exec()
    },
    getGoogleNewCustomerInsertQuery:(params) => {
        let password = 'startasker';
        let hashedPassword = bcrypt.hashSync(password, 8);
        let Google = {
            GoogleID : params.ID,
            tokenId: params.tokenID
        }
        const register_timestamp = new Date().getTime().toString()
            let customer =  new Customers({ 
                userID: params.userID,
                password: hashedPassword,
                otp: 'startasker',
                register_type: params.register_type,
                register_time: register_timestamp,   
                Google: Google,
                firstName: params.firstName,
                lastName: params.lastName,
                loc: [params.latitude,params.longitude],
                verification_status: true,
                profilePic: params.profilePic
            })
            return customer;
        
    },
    getFBCustomerUpdateQuery: (params) =>{
        let Facebook = {
            facebookID : params.ID,
            tokenId: params.tokenID
        }
        return Customers.updateOne({ userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                firstName: params.firstName,
                lastName: params.lastName,
                loc: [params.latitude,params.longitude],
                Facebook : Facebook

            }
        }).exec()
    },
    getGoogleCustomerUpdateQuery: (params) =>{
        let Google = {
            GoogleID : params.ID,
            tokenId: params.tokenID
        }
        return Customers.updateOne({ userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                firstName: params.firstName,
                lastName: params.lastName,
                loc: [params.latitude,params.longitude],
                Google : Google

            }
        }).exec()
    },

    getInsertCustomerSkillsQuery: (params) =>{
        let skills = {            
            trasportations: params.trasportations,
            languages: params.languages,
            education: params.education,
            work: params.work,
            specialities: params.specialities
        }
        let CustomerSettings = new CustomersSettings({
            userID: params.userID,
            skills: skills
        })
        return CustomerSettings;
    },
    getUpdateCustomerSkillsQuery:(params) =>{
        let skills = {
            trasportations: params.trasportations,
            languages: params.languages,
            education: params.education,
            work: params.work,
            specialities: params.specialities
        }
        return CustomersSettings.updateOne({userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                skills: skills
            }
        }).exec()
    },
    getUpdateCustomerNotificationsQuery:(params) =>{
        let notifications = {
            transactional :{
                Email: params.transactional.Email,
                Push: params.transactional.Push
            },
            taskUpdates :{
                Email: params.taskUpdates.Email,
                Push: params.taskUpdates.Push
            },
            taskReminders :{
                Email: params.taskReminders.Email,
                Push: params.taskReminders.Push
            },
            startaskerAlerts :{
                Email: params.startaskerAlerts.Email,
                Push: params.startaskerAlerts.Push
            },
            taskRecommendations :{
                Email: params.taskRecommendations.Email,
                Push: params.taskRecommendations.Push
            },
            helpfullInfo :{
                Email: params.helpfullInfo.Email,
                Push: params.helpfullInfo.Push
            },
            updateNewsletters :{
                Email: params.updateNewsletters.Email,
                Push: params.updateNewsletters.Push
            }           
        }
        return CustomersSettings.updateOne({userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                notifications: notifications
            }
        }).exec()
    },
    getCustomerSettingQuery: (params) => {
         return CustomersSettings.findOne({ userID: new RegExp('^' + params.userID + '$', "i") },{_id: 0, __v: 0}).exec()
    },
    insertCustomerQuery: (params) => {
        let CustomerSettings = new CustomersSettings({
            userID: params.userID
        })
        return CustomerSettings;
    },
    getUpdateCustomerTaskAlertQuery:(params) =>{
        
        return CustomersSettings.updateOne({userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                'taskAlerts.alerts': params.taskAlert
            }
        }).exec()
    },
    getInsertCustomerCustomAlertsQuery: (params,alertID) =>{
       let alertType = {
           inPerson: params.alertType.inPerson,
           remote: params.alertType.remote
       }
       let customAlerts = [{
            alertID: alertID,
            alertType: alertType,
            taskName: params.taskName,
            taskLocation: params.taskLocation,
            taskDistance: params.taskDistance
       }]
       return CustomersSettings.updateOne( { userID: params.userID }, 
        { $push: { 'taskAlerts.customAlerts': customAlerts } }).exec()        
    },

    getDeleteCustomTaskAlert:(params) =>{
        return CustomersSettings.updateOne( { userID: params.userID},
                              {$pull:{"taskAlerts.customAlerts": {"alertID":params.alertID }}}).exec()
    },

    getUpdateCustomerSearchConfig:(params) =>{
        let search_Configurations = {
            lat: params.lat,
            long: params.long,
            radius: params.radius,
            maxPrice: params.maxPrice,
            minPrice: params.minPrice,
            taskTypes: params.taskTypes,
            locationName: params.locationName,
            hideAssignedTask: params.hideAssignedTask
        }
        return Customers.updateOne({ userID: new RegExp(params.userID, 'i')},
        {
            $set: {
                search_Configurations: search_Configurations
            }
        }).exec()
    },
    getJobsBasedOnCustomerSearchConfig:(params) =>{
        var postType;
        if(params.taskTypes === 'In Person'){
            postType = [false];            
        }else if(params.taskTypes === 'Remote'){
            postType = [true];
        }else {
            postType = [true,false];
        }
        var postStatus;
        if(params.hideAssignedTask == 'false'){
            postStatus = ['post','Open','completed','overdue','closed','expired','draft','allocated']
        }else{
            postStatus = ['post','assigned','Open','completed','overdue','closed','expired','draft','allocated']
        }
        var limit = params.limit || 500;
        console.log('limit value..'+limit);
        // get the max distance or set it to 10 kilometers
        var maxDistance = params.radius || 10000;
        console.log('max distance...'+maxDistance);
        maxDistance /= 6371;
        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = params.lat;
        coords[1] = params.long;
        var query = {            
            $and: [{ loc: { $near: coords,$maxDistance: maxDistance}},{'budget.budget': { $gte: params.minPrice,$lte: params.maxPrice} },{
                      location: {$regex: params.locationName}},{
                      canThisTaskRemote: {$in: postType}},{
                          post_Status: {$in: postStatus}
                      },
                        {$or:[{ postTitle: { $regex: params.search_term, $options: 'i' }}, { 
                            location: { $regex: params.search_term, $options: 'i' }},{ 
                            'category.categoryName':  { $regex: params.search_term, $options: 'i' }}
                    ]
                    }] 
                    }
        return PostJob.find(query, {_id: 0, __v: 0}).limit(limit).exec()
    },
    customerProfileUpdateQuery:(params,imageName) => {

        return Customers.updateOne({userID: new RegExp(params.userID, 'i')},
            {
                $set: {
                    profilePic: imageName
                }
            }).exec()
    },
    customerAccountUpdateQuery:(params) =>{
        return Customers.updateOne({userID: new RegExp(params.userID, 'i')},
            {
                $set: {
                    BankAccountDetailes:{
                        Accountnumber: params.Accountnumber,
                        Accountholdername: params.Accountholdername,
                        BSB: params.BSB
                    }
                }
            }).exec()
    },
    customerAddressUpdateQuery:(params) =>{
        return Customers.updateOne({userID: new RegExp(params.userID, 'i')},
            {
                $set: {
                    BillingAddress: {
                        AddressLine1: params.AddressLine1,
                        AddressLine2: params.AddressLine2,
                        Suburb: params.Suburb,
                        State: params.State,
                        Postcode: params.Postcode,
                        Country: params.Country

                    }
                }
            }).exec()
    },
    customerDOBUpdateQuery:(params) =>{
        return Customers.updateOne({userID: new RegExp(params.userID, 'i')},
            {
                $set: {
                    dob: params.dob
                }
            }).exec()
    },
    customerMobilenoUpdateQuery:(params,otp) =>{
        return Customers.updateOne({userID: new RegExp(params.userID, 'i')},
            {
                $set: {
                    phoneNumber: params.phoneNumber
                }
            }).exec()
    }
}

module.exports = CustomersDBQueries;