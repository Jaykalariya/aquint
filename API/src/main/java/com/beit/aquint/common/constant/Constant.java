package com.beit.aquint.common.constant;

/**
 * <h1> Add heading here </h1>
 * <p>
 * Add Description here.
 * </p>
 *
 * @author - jaykalariya
 * @since - 29/10/23  10:18 pm
 */
public class Constant {

    public class Page {
        public static final Integer DEFAULT_PAGE_SIZE = 10;
        public static final String DEFAULT_PAGE_SORT = "createdOn";
        public static final Boolean DEFAULT_PAGE_ORDER = Boolean.TRUE;
    }

    public class Mappping {
        //        Role Mapping
        public static final String ROLE_CREATE_UPDATE = "/createOrUpdate";
        public static final String ROLE_GET_ALL_WITH_PAGINATION = "/page";
        public static final String ROLE_GET_ALL = "/getAll";

        public static final String PRODUCT_TYPE_ADD = "/addProductType";
        public static final String PRODUCT_TYPE_GET_ALL = "/getAllProductType";
        public static final String PRODUCT_TYPE_GET_WITH_PAGE = "/getProductTypeByPage";

        public static final String DEPARTMENT_ADD = "/addDepartment";
        public static final String DEPARTMENT_GET_ALL = "/getAllDepartment";
        public static final String DEPARTMENT_GET_PAGE = "/getDepartmentByPage";

        public static final String DIVISION_ADD = "/addDivision";
        public static final String DIVISION_GET_ALL = "/getAllDivision";
        public static final String DIVISION_GET_PAGE = "/getDivisionByPage";

        public static final String PLACE_OF_SUPPLY_ADD = "/addPlaceOfSupply";
        public static final String PLACE_OF_SUPPLY_GET_ALL = "/getAllPlaceOfSupply";
        public static final String PLACE_OF_SUPPLY_GET_PAGE = "/getPlaceOfSupplyByPage";

        public static  final  String EMAIL ="/email";
        public static  final  String USERNAME ="/username";
        public static final String GET_USER_BASIC_DETAILS = "/getUserDetails";
        public static final String ADD_USER = "/addUser";
        public static final String UPDATE_USER = "/updateUser";
        public static final String ALL_USER_DETAILS = "/allUserDetails";
        public static final String USER_GET_ALL_WITH_PAGINATION = "/page";
        public static final String GET_ALL_USER_BASIC_DETAILS = "/getAllUserDetails";

        public static final String TENDER_STAGE_ADD = "/addTenderStage";
        public static final String TENDER_STAGE_GET_ALL = "/getAllTenderStage";
        public static final String TENDER_STAGE_GET_PAGE = "/getTenderStageByPage";

        public static final String TENDER_TYPE_ADD = "/addTenderType";
        public static final String TENDER_TYPE_GET_ALL = "/getAllTenderType";
        public static final String TENDER_TYPE_GET_PAGE = "/getTenderTypeByPage";

        public static final String ADD_NEW_TENDER = "/addNewTender";
        public static final String GET_ALL_TENDER_BASED_ON_USER = "/getTenderList";

    }

    public class File {
        //        Role Mapping
        public static final String FILE_FOLDER_PATH_FOR_USER_IMAGE = "userProfile";
        public static final String ROLE_GET_ALL_WITH_PAGINATION = "/page";
    }

    public class Status {
        public static final String ACTIVE = "Active";
        public static final String IN_ACTIVE = "In Active";
    }

    public class Query {
        public static final String ALL_USER_FULL_DETAIL = """
                SELECT u.id, u.email, u.username, ud.first_name as firstName, ud.middle_name as middleName, ud.last_name as lastName, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                GROUP BY u.id, u.email, u.username, ud.first_name, ud.middle_name, ud.last_name
                """;

        public static final String USER_PAGING_WITH_SEARCH = """
                SELECT u.id, u.email, u.username, ud.first_name as firstName, ud.middle_name as middleName, ud.last_name as lastName, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                WHERE Lower(u.username) LIKE Lower(CONCAT('%', :search, '%'))
                GROUP BY u.id, u.email, u.username, ud.first_name, ud.middle_name, ud.last_name
                """;

        public static final String USER_PAGING_WITHOUT_SEARCH = """
                SELECT u.id, u.email, u.username, ud.first_name as firstName, ud.middle_name as middleName, ud.last_name as lastName, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                GROUP BY u.id, u.email, u.username, ud.first_name, ud.middle_name, ud.last_name
                """;

        public static final String USER_FULL_DETAIL = """
                SELECT u.id, u.email, u.username, ud.first_name as firstName, ud.middle_name as middleName, ud.last_name as lastName, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                WHERE u.id = :userId
                GROUP BY u.id, u.email, u.username, ud.first_name, ud.middle_name, ud.last_name
                """;
    }
    public class TenderHistoryConstant {
        public static final String ADD_NEW_TENDER = "Tender Created By ";
        public static final String ADD_NEW_MEMBER = " Was added By ";
    }
}
