/**
 * User Model used to query dynamodb
 */

 //Load dependencies
const uuid = require("uuid/v1");
const credentials = require("../config/keys");



const CreateUser = (googleId,email) => {
    return {
    TableName : credentials.UserTable,
    Item : {
      id: uuid(),
      googleId: googleId,
      email: email,
      credits: 0
    }};
}


const DeductCredits = (googleId,credits) => {

  return  {
        TableName: credentials.UserTable,
        Key: {
          googleId:  googleId   
        },
        ExpressionAttributeValues: {
          ":u1": credits
        },
        UpdateExpression: "SET credits = credits - :u1",
        ReturnValues: "ALL_NEW"
      };
}


const AddCredits = (googleId,credits) => {

  return  {
        TableName: credentials.UserTable,
        Key: {
          googleId:  googleId   
        },
        ExpressionAttributeValues: {
          ":u1": credits
        },
        UpdateExpression: "ADD credits :u1",
        ReturnValues: "ALL_NEW"
      };
}

const UserByGoogleId = (googleId) => {
    return {
        TableName: credentials.UserTable,
        Key: {
          googleId: googleId
        }
      };
}


const UserByUID = (id) => {
    return {
        TableName: credentials.UserTable,
        IndexName: "id-index",
        KeyConditionExpression: "id = :v1",
        ExpressionAttributeValues: {
          ":v1":  id
        }
      };
}

module.exports = {
    CreateUser,AddCredits,UserByGoogleId,UserByUID,DeductCredits
}