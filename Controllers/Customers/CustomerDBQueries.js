const Customers = require('../../app/Models/Customers');
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
    }
    
}

module.exports = CustomersDBQueries;