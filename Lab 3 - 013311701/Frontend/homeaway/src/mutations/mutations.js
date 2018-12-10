import {gql} from 'apollo-boost';

const signup = gql`
mutation Signup($FirstName: String, $LastName: String, $Email: String, $Password: String, $Accounttype: Int){
    signup(FirstName: $FirstName, LastName: $LastName, Email: $Email, Password: $Password, Accounttype: $Accounttype){
        success  
        duplicateUser      
    }
}`

const bookProperty = gql`
    
    mutation bookProperty($PropertyId: String, $Ownername: String, $Headline: String, $PropertyType: String, $PropertyBedrooms: Int, $PropertyBathrooms: Int, $PropertyAccomodates: Int, $PropertyBookingStartDate: String, $PropertyBookingEndDate:String, $PropertyTotalCost: String, $Email: String, $FirstName: String){
        bookProperty(PropertyId: $PropertyId, Ownername: $Ownername, Headline: $Headline, PropertyType: $PropertyType, PropertyBedrooms: $PropertyBedrooms, PropertyBathrooms: $PropertyBathrooms, PropertyAccomodates: $PropertyAccomodates, PropertyBookingStartDate: $PropertyBookingStartDate, PropertyBookingEndDate:$PropertyBookingEndDate, PropertyTotalCost: $PropertyTotalCost, Email: $Email, FirstName: $FirstName){
            success
        }
    }
    
`

export {signup, bookProperty};