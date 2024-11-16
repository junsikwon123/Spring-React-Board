enum ResponseCode {

    // HTTP Status 200
    SUCCESS = "SU",

    // HTTP Status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_EMAIL = "DF",
    DUPLICATE_NICKNAME = "DN",
    DUPICATE_TEL_NUMVER = "DT",
    NOT_EXISTED_USER = "NU",
    NOT_EXIStED_BOARD = "NB",

    // HTTP Status 401
    SIGN_IN_FAIL = "SF",
    AUthORIZATION = "AF",

    // HTTP Status 403
    NO_PERMISSION = "NP",

    // HTTP Status 500
    DATABASE_ERROR = "DBE",
}
export default ResponseCode;