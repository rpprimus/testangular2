export  class AppConstant {
    static emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-\\+]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    static phoneNumberRegEx = "[()+0-9-xX ]+"; // Allowed Chars ( ) + 0-9 - x X
    static integerRegEx = /^[-+]?(\d)*$/g;      //All integers are allowed  //static integerRegEx = /^[- - +]?[0-9]*$/g;
    static priceRegEx = /^\d+(,\d{3})*(\.\d{1,2})?$/;     //for price value which can contain decimal and 2 characters afterward
    static whitespaceRegex = "^$";    // invalid for the trail of spaces
    static wholeNumberRegEx = "^[0-9]+$";      //Only positive numbers are allowed
    static naturalNumberRegex = /^\d*[1-9]\d*$/ ;//"^[1-9]\d*$"; //"^[1-9]+$";      //Only positive numbers without 0 are allowed
    static usPhoneNumberRegex = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$"; //satisfy 123-123-1234
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Minimum 8 char with singel Capital-Letter|numeric|SpecialChar
    static trackingNumRegex =  /^[A-Za-z0-9\-\s\/]+$/;// /^[a-zA-Z0-9 ]+[-]?/;  //Allowed all numbers with just 1 hyphen (special character)
    
}
