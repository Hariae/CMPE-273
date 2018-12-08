import {gql} from 'apollo-boost';

// const submitLogin = gql`
//     query Login(Username: String, Password: String){
//         login(Username: "aehari2010@gmail.com", Password: "Password"){
//             result
//         }
//     }`


const login = gql`
query login($Username: String, $Password: String){
        login(Username: $Username, Password: $Password){
            result
            userData{
                Username
                Email
                FirstName
                LastName
                Aboutme
              Country
              City
              Gender
              Hometown
              School
              Company
              Language
              PhoneNumber
              Accounttype
              }
        }
    }`

const profile = gql`
    query profile($Email: String){
        profile(Email: $Email){
            Username
            Email
            FirstName
            LastName
            Aboutme
            Country
            City
            Gender
            Hometown
            School
            Company
            Language
            PhoneNumber
        }
    }
`

export {login, profile};