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

const updateProfile = gql`
    mutation updateProfile($FirstName: String, $LastName: String, $Email: String, $PhoneNumber: String, $Aboutme: String, $Country: String, $City: String, $Gender:String, $School: String, $Hometown: String, $Language: String, $Company: String){
        updateProfile(FirstName:$FirstName,LastName:$LastName, Email:$Email, PhoneNumber:$PhoneNumber, Aboutme: $Aboutme, Country:$Country, City: $City, Gender: $Gender, School:$School, Hometown: $Hometown, Language: $Language, Company: $Company){
            success
        }
    }
`

export {signup, bookProperty, updateProfile};