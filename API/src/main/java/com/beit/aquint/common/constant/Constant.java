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
        public static final String CHANGE_USER_STATUS = "/changeUserStatus";

        public static final String TENDER_STAGE_ADD = "/addTenderStage";
        public static final String TENDER_STAGE_GET_ALL = "/getAllTenderStage";
        public static final String TENDER_STAGE_GET_PAGE = "/getTenderStageByPage";
        public static final String CHANGE_STAGE = "/changeStage";

        public static final String ALL_TENDER_DETAILS = "/allTenderDetails";
        public static final String TENDER_TYPE_ADD = "/addTenderType";
        public static final String TENDER_TYPE_GET_ALL = "/getAllTenderType";
        public static final String TENDER_TYPE_GET_PAGE = "/getTenderTypeByPage";

        public static final String ADD_NEW_TENDER = "/addNewTender";
        public static final String GET_ALL_TENDER_BASED_ON_USER = "/getTenderList";
        public static final String TENDER_GET_ALL_WITH_PAGINATION = "/page";

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
                SELECT u.id, u.email, u.username, u.status, ud.firstname as firstname, ud.middlename as middlename, ud.lastname as lastname, ud.image_url as imageUrl, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                GROUP BY u.id, u.email, u.username, ud.firstname, ud.middlename, ud.lastname, ud.image_url
                """;

        public static final String USER_PAGING_WITH_SEARCH = """
                SELECT u.id, u.email, u.username, u.status, ud.firstname as firstname, ud.middlename as middlename, ud.lastname as lastname, ud.image_url as imageUrl, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                WHERE Lower(u.username) LIKE Lower(CONCAT('%', :search, '%'))
                GROUP BY u.id, u.email, u.username, ud.firstname, ud.middlename, ud.lastname, ud.image_url
                """;

        public static final String USER_PAGING_WITHOUT_SEARCH = """
                SELECT u.id, u.email, u.username, u.status, ud.firstname as firstname, ud.middlename as middlename, ud.lastname as lastname, ud.image_url as imageUrl, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                GROUP BY u.id, u.email, u.username, ud.firstname, ud.middlename, ud.lastname, ud.image_url
                """;

        public static final String USER_FULL_DETAIL = """
                SELECT u.id, u.email, u.username, u.status, ud.firstname as firstname, ud.middlename as middlename, ud.lastname as lastname, ud.image_url as imageUrl, STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
                FROM users u
                INNER JOIN user_detail ud ON u.id = ud.user_id
                LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                WHERE u.id = :userId
                GROUP BY u.id, u.email, u.username, ud.firstname, ud.middlename, ud.lastname, ud.image_url
                """;

        public static final String TENDER_FULL_DETAILS =  """
    SELECT
        td.id AS id,
        td.project_name AS projectName,
        td.project_display_name AS "projectDisplayName",
        ts.tender_stage_name AS "tenderStage",
        tt.tender_type_name AS "tenderType",
        td.project_value AS "projectValue",
        TO_CHAR(td.submission_date, 'YYYY-MM-DD') AS "submissionDate",
        td.emd_exemption AS "emdExemption",
        td.tender_fee_exemption AS "tenderFeeExemption",
        td.emd_amount AS "emdAmount",
        td.tender_fee AS "tenderFee",
        td.emd AS "emd",
        td.location AS "location",
        CAST((
            SELECT
                jsonb_agg(json_build_object(
                    'fullName', ud.firstname || ' ' || COALESCE(ud.middlename, '') || ' ' || ud.lastname,
                    'profileURL', ud.image_url
                ))
            FROM
                tender_assigned_users tau2
            LEFT JOIN
                user_detail ud ON tau2.user_id = ud.user_id
            WHERE
                tau2.tender_id = td.id
        ) AS jsonb) AS "assignedUser"
    FROM
        tender_details td
    LEFT JOIN
        tender_assigned_users tau2 ON tau2.tender_id = td.id
    LEFT JOIN
        tender_stage ts ON td.tender_stage = ts.id
    LEFT JOIN
        tender_type tt ON td.tender_type = tt.id
    WHERE
        td.id IN (
            SELECT
                tau.tender_id
            FROM
                tender_assigned_users tau
        )
    GROUP BY
        td.id, tt.tender_type_name, ts.tender_stage_name
""";

        public static final String TENDER_PAGING_WITH_SEARCH = """
    SELECT
        td.id AS id,
        td.project_name AS projectName,
        td.project_display_name AS "projectDisplayName",
        ts.tender_stage_name AS "tenderStage",
        tt.tender_type_name AS "tenderType",
        td.project_value AS "projectValue",
        TO_CHAR(td.submission_date, 'YYYY-MM-DD') AS "submissionDate",
        td.emd_exemption AS "emdExemption",
        td.tender_fee_exemption AS "tenderFeeExemption",
        td.emd_amount AS "emdAmount",
        td.tender_fee AS "tenderFee",
        td.emd AS "emd",
        td.location AS "location",
        CAST((
            SELECT
                jsonb_agg(json_build_object(
                    'fullName', ud.firstname || ' ' || COALESCE(ud.middlename, '') || ' ' || ud.lastname,
                    'profileURL', ud.image_url
                ))
            FROM
                tender_assigned_users tau2
            LEFT JOIN
                user_detail ud ON tau2.user_id = ud.user_id
            WHERE
                tau2.tender_id = td.id
        ) AS jsonb) AS "assignedUser"
    FROM
        tender_details td
    LEFT JOIN
        tender_assigned_users tau2 ON tau2.tender_id = td.id
    LEFT JOIN
        tender_stage ts ON td.tender_stage = ts.id
    LEFT JOIN
        tender_type tt ON td.tender_type = tt.id
    WHERE
        td.id IN (
            SELECT
                tau.tender_id
            FROM
                tender_assigned_users tau
        )
        AND
    Lower(td.project_name) LIKE Lower(CONCAT('%', :search, '%'))
    GROUP BY
        td.id, tt.tender_type_name, ts.tender_stage_name
""";



        public static final String TENDER_PAGING_WITHOUT_SEARCH = """
   SELECT
        td.id AS id,
        td.project_name AS projectName,
        td.project_display_name AS "projectDisplayName",
        ts.tender_stage_name AS "tenderStage",
        tt.tender_type_name AS "tenderType",
        td.project_value AS "projectValue",
        td.submission_date AS "submissionDate",
        td.emd_exemption AS "emdExemption",
        td.tender_fee_exemption AS "tenderFeeExemption",
        td.emd_amount AS "emdAmount",
        td.tender_fee AS "tenderFee",
        td.emd AS "emd",
        td.location AS "location",
        jsonb_agg(json_build_object(
             'fullName', COALESCE(ud.firstname,'') || ' ' || COALESCE(ud.middlename,'') || ' ' || COALESCE(ud.lastname,''),
             'profileUrl', ud.image_url
        )) AS "assignedUser"
   FROM
        tender_details td
   LEFT JOIN
        tender_assigned_users tau2 ON tau2.tender_id = td.id
   LEFT JOIN
        tender_stage ts ON td.tender_stage = ts.id
   LEFT JOIN
        tender_type tt ON td.tender_type = tt.id
   LEFT JOIN
        user_detail ud ON tau2.user_id = ud.user_id
   WHERE
        td.id IN (
             SELECT tau.tender_id
             FROM tender_assigned_users tau
             WHERE td.id = tau.tender_id
             )
   GROUP BY
        td.id, tt.tender_type_name, ts.tender_stage_name
""";

        public static final String COUNT_QUERY = """
                SELECT Count(td.id)
                From tender_details td
                """;
    }

    public class TenderHistoryConstant {
        public static final String ADD_NEW_TENDER = "Tender Created By ";
        public static final String ADD_NEW_MEMBER = " Was added By ";
        public static final String STAGED_CHANGED = "Staged Changed to ";
    }
}
