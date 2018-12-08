import {gql} from 'apollo-boost';

const signup = gql`
mutation Signup($FirstName: String, $LastName: String, $Email: String, $Password: String, $Accounttype: Int){
    signup(FirstName: $FirstName, LastName: $LastName, Email: $Email, Password: $Password, Accounttype: $Accounttype){
        success  
        duplicateUser      
    }
}`

export {signup};