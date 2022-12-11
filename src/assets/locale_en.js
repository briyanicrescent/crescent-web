export const messages = {   
    header:{
        title: "Crescent Briyani",
        contact: "Call and Order - 87436485845"
    },
    body:{
        md:{
            info: "Download our mobile app to order online"
        }
    },
    select:{
        default: "Select"
    },
    processing:{
        inprogress: "Loading!"
    },
    welcome:{
        prefix: "Hello",
        default: "User"
    },
    orders:{
        button: "Orders"
    },
    errors:{
        "500":({named})=>`${named('errorid') === undefined //Technical
                ? 'Technical Glitch. Please try again or Contact us: 8438931322'
                : 'Technical Glitch. Please try again or Contact us: 8438931322, Error id : '+named('errorid')}`,
        "403":"Login via Google!",
        "401":"Access Denied, Relogin via Google and try!" 
    },
    validations:{
        required: "{property} required",
        invalid: "{property} invalid",
        minLength: "{property} minimum length {length}",
        maxLength: "{property} maximum length {length}"
    },
    product:{
        none: "This Branch is not yet operational",
        dcharge: "Delivery Charge",
        addAddress: "Address"
    },
    cart:{
        place: "Place Order"
    },
    user:{
        info:"We do not have your address/contact details yet.Please provide your details before placing order",
        header: "Details",
        mobileNo: "Mobile no",
        name: "Name"
    },
    address:{
        header: "Address",
        address: "Address",
        pincode: "Pincode"
    },
    currency:{
        rs: "Rs."
    },
    buttons:{
        save: "Save"
    }
}
