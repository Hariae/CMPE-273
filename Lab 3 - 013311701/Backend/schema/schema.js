const graphql = require('graphql');
//const _ = require('lodash');
var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;



const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: ()=>({
        Username : {
            type: GraphQLString
        },
        Password : {
            type: GraphQLString
        },
        FirstName : {
            type: GraphQLString
        },
        LastName : {
            type : GraphQLString
        },
        Email : {
            type : GraphQLString
        },
        Aboutme :  {
            type : GraphQLString
        },
        Country : {
            type : GraphQLString
        },
        City : { 
            type : GraphQLString
        },
        Gender : {
            type : GraphQLString
        },
        Hometown : {
            type : GraphQLString
        },
        School : {
            type : GraphQLString
        },
        Company : {
            type : GraphQLString
        },
        Language : {
            type : GraphQLString
        },
        PhoneNumber : {
            type : GraphQLString
        },
        Accounttype : {
            type : GraphQLString
        }
    })
});    

const loginResult = new GraphQLObjectType({
    name:'loginResult',
    fields:()=>({
        result : {type: GraphQLBoolean},
        userData : {type: ProfileType}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ()=>({
       login: {
           type: loginResult,
           args: {
               Username : {
                type: GraphQLString
                },
                Password : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){

                console.log('args: ', args);
                var isAuthenticated = false;
                var profileData = {};
                
                await Model.Userdetails.findOne({
                    "Username" : args.Username
                }, (err, user)=>{
                    if(err){
                        isAuthenticated=false;
                    }
                    else{
                        console.log('result', user.Username);
                        if (!bcrypt.compareSync(args.Password, user.Password)) {                
                            console.log('Invalid Credentials!');
                            //callback(null, null);                
                       isAuthenticated=false;
                        }
                        else{
                            console.log('Corect creds!')
                            isAuthenticated=true;
                            
                            profileData = user
                            
                        }
                    }
                });
                
                console.log('isauth', isAuthenticated);
                console.log('Profile Data', profileData);
                if(isAuthenticated==true){
                    var result = {
                        result : true,
                        userData : profileData
                    }
                    console.log('UserData', result.userData);
                }
                else
                {
                    var result = {
                        result : false
                    }
                }
                return result
            }
       } 
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});