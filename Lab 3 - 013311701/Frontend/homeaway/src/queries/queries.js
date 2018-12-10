import {gql} from 'apollo-boost';

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

const search = gql`
    query search($searchText: String, $startDate: String, $endDate: String){
        search(searchText: $searchText, startDate: $startDate, endDate: $endDate){
            properties {
                PropertyId
                Headline
                Description
                Country
                StreetAddress
                City
                State
                ZipCode
                PropertyType
                Bedrooms
                Accomodates
                Bathrooms
                Photos
                Currency
                Baserate
                AvailabilityStartDate
                AvailabilityEndDate
                MinStay
                Ownername
                OwnerId
              }
        }
    }
`

const property = gql`
    query property($propertyId : String){
        property(propertyId : $propertyId){
            PropertyId
                Headline
                Description
                Country
                StreetAddress
                City
                State
                ZipCode
                PropertyType
                Bedrooms
                Accomodates
                Bathrooms
                Photos
                Currency
                Baserate
                AvailabilityStartDate
                AvailabilityEndDate
                MinStay
                Ownername
                OwnerId
        }
    }
`
const tripDetails = gql`
    query tripDetails($Email:String){
        tripDetails(Email: $Email){
            trips {
                PropertyId
        Bookingstartdate
        Bookingenddate
        TotalCost
        Ownername
        Travelername
        Headline
        PropertyType
        PropertyBedrooms
        PropertyBathrooms
        PropertyAccomodates
            }
        }
    }
`

var postedProperties = gql`
    query postedProperties($Email: String){
        postedProperties(Email:$Email){
            postedProperties{

            
            PropertyId
            AvailabilityStartDate
            AvailabilityEndDate
            Baserate
        Headline
        PropertyType
    }
        }
    }

`
export {login, profile, search, property, tripDetails, postedProperties};