export enum ErrorCode {
  E999999 = 999999, // Other exception
  E999422 = 999422, // Validator invalid
  E999401 = 999401, // Unauthorized
  E999404 = 999404, // URL API invalid
  // Authenticate
  E101001 = 101001,
  E101002 = 101002,
  E101003 = 101003,
  E101004 = 101004,
  // Inspection items
  E110000 = 110000,
  E110001 = 110001, // Inspection item name da ton tai.
  E110002 = 110002, // Cannot upgrade input_type
  // Inspection type
  E111000 = 111000, //Inspection type does not exist
  E111001 = 111001, // Inspection type with company_code and inspection_code is exist
  E111002 = 111002, // Combine type is exist
  E111003 = 111003, // Multi inspection type with id is not found
  // Tab
  E113000 = 113000, // Tab không tồn tại.
  E113099 = 113099, // Loi exception xoa trong CSDL (DB exception)

  // Inspection schedule result
  E115000 = 115000, // The inspection schedule result not found
  // Inspector
  E120001 = 120001, // Inspector invalid
  E120002 = 120002, // Inspector does not exist

  // Site
  E130000 = 130000, // Site does not exist
  E130001 = 130001, // Site has already exists

  // USER
  E102000 = 102000, // User does not exist
  E102001 = 102001, // User has already exists
  E102002 = 102002, // Email has already exists

  //ROLE
  E103000 = 103000, // Role does not exist
  E103001 = 103001, // Role_Program does not exist

  // MST Reason
  E140000 = 140000, // MST Reason does not exist
  E140001 = 140001, // MST Reason has already exists
  //Master Programs
  E105000 = 105000, // Program does not exist
  // Inspection type comment
  E150000 = 150000, // MST Reason does not exist
  E150001 = 150001, // MST Reason has already exists

  // MST Car Body Type
  E160000 = 160000, // MST Car Body Type does not exist
  E160001 = 160001, // MST Car Body Type has already exists

  // System(generic code, parameter,...)
  E201001 = 201001, // System invalid
  E201002 = 201002, // Generic code does not exist
  E201003 = 201003, // Parameter does not exist
  E201004 = 201004, // Language label does not exist

  E203001 = 203001, // System common-exception-day data has already existed
  E203002 = 203002, // System common-exception-day data not found
  E203003 = 203003, // System common-exception-day invalid request data

  // Mail template
  E104000 = 104000, // Mail templates doest not exists
  E104001 = 104001, // Mail templates has already exists

  //Inspection schedule result
  E301000 = 301000, // order_number in INS_Schedule_Result does not exist
  E301001 = 301001, // INS_Schedule_Result does not exist
  E301002 = 301002, // cannot update inspection_result after approved
  E301003 = 301003, // cannot permission set approve inspection
  E301004 = 301004, // not the onwer of inspection schedule result
  E301005 = 301005, // ins_result invalid

  // Barcode
  E202001 = 202001, // barcode is linked with other identification number earlier
  E202002 = 202002, // identification number is with other barcode linked earlier

  // Notification
  E303000 = 303000, // Notification doest not exists
  E303001 = 303001, // Notification has already exists

  //NotificationUser
  E304000 = 304000, // Notification doest not exists
  E304001 = 304001, // Notification has already exists
}
