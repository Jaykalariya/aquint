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
        public static final String DEFAULT_PAGE_SORT = "id";
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

        public static final String USER_BASIC_INFO = "/userBasicInfo";
        public static final String ADD_USER = "/addUser";
        public static final String UPDATE_USER = "/updateUser";
        public static final String ALL_USER_DETAILS = "/allUserDetails";
        public static final String USER_GET_ALL_WITH_PAGINATION = "/page";
        public static final String GET_ALL_USER_BASIC_DETAILS = "/getAllUserDetails";
        public static final String CHANGE_USER_STATUS = "/changeUserStatus";
        public static final String CHANGE_PROFILE_IMAGE = "/changeProfileImage";

        public static final String TENDER_DASHBOARD = "/tenderDashboard";
        public static final String ADD_TENDER_NOTE = "/addTenderNote";
        public static final String TENDER_NOTES = "/tenderNotes";
        public static final String TENDER_STAGE_ADD = "/addTenderStage";
        public static final String TENDER_STAGE_GET_ALL = "/getAllTenderStage";
        public static final String ACTIVE_TENDER_STAGE_GET_ALL = "/getAllActiveTenderStage";
        public static final String TENDER_STAGE_GET_PAGE = "/getTenderStageByPage";
        public static final String CHANGE_STAGE = "/changeStage";
        public static final String TIMELINE = "/timeline";

        public static final String ALL_TENDER_DETAILS = "/tenderDetails";
        public static final String TENDER_TYPE_ADD = "/addTenderType";
        public static final String TENDER_TYPE_GET_ALL = "/getAllTenderType";
        public static final String TENDER_TYPE_GET_PAGE = "/getTenderTypeByPage";

        public static final String ADD_NEW_TENDER = "/addNewTender";
        public static final String GET_ALL_TENDER_BASED_ON_USER = "/getTenderList";
        public static final String TENDER_GET_ALL_WITH_PAGINATION = "/page";

        public static final String UPLOAD_FILE = "/upload/file";
        public static final String DELETE_FILE = "/delete/file";
        public static final String ALL_DOCUMENTS = "/allDocuments";


    }

    public class File {
        //        Role Mapping
        public static final String FILE_FOLDER_PATH_FOR_USER_IMAGE = "userProfile";
        public static final String ROLE_GET_ALL_WITH_PAGINATION = "/page";

        public static final String FILE_FOLDER_PATH_FOR_TENDER_FILES = "tenderDocuments";
    }

    public class Status {
        public static final String ACTIVE = "Active";
        public static final String IN_ACTIVE = "Inactive";
        public static final String CONTACT_ADMIN = "User status is Inactive, Please Contact Admin";
        public static final String USER_NOT_FOUND = "User not found, Please enter correct credentials";

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

        public static final String ALL_TENDER_FULL_DETAILS =  """
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
        td.location AS "location",
        CAST((
            SELECT
                jsonb_agg(json_build_object(
                    'fullName', COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,''),
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

        public static final String TENDER_FULL_DETAILS =  """
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
        td.location AS "location",
        CAST((
            SELECT
                jsonb_agg(json_build_object(
                    'fullName', COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,''),
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
        td.id = :tenderId
    GROUP BY
        td.id, tt.tender_type_name, ts.tender_stage_name
""";

        public static final String TENDER_PAGING_WITH_SEARCH = """
    SELECT
        td.id AS id,
        td.project_name AS projectName,
        td.project_display_name AS "projectDisplayName",
        ts.tender_stage_name AS "tenderStage",
        ts.color AS tenderStageColor,
        ts.stage_value AS tenderStageValue,
        tt.tender_type_name AS "tenderType",
        td.project_value AS "projectValue",
        td.submission_date AS "submissionDate",
        td.emd_exemption AS "emdExemption",
        td.tender_fee_exemption AS "tenderFeeExemption",
        td.emd_amount AS "emdAmount",
        td.tender_fee AS "tenderFee",
        td.location AS "location",
        CAST((
            SELECT
                jsonb_agg(json_build_object(
                    'fullName', COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,''),
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
            WHERE
                tau.user_id = :userId
        )
        AND
    Lower(td.project_name) LIKE Lower(CONCAT('%', :search, '%'))
    GROUP BY
        td.id, tt.tender_type_name, ts.tender_stage_name,ts.color,ts.stage_value
""";



        public static final String TENDER_PAGING_WITHOUT_SEARCH = """
   SELECT
        td.id AS id,
        td.project_name AS projectName,
        td.project_display_name AS "projectDisplayName",
        ts.tender_stage_name AS "tenderStage",
        ts.color AS tenderStageColor,
        ts.stage_value AS tenderStageValue,
        tt.tender_type_name AS "tenderType",
        td.project_value AS "projectValue",
        td.submission_date AS "submissionDate",
        td.emd_exemption AS "emdExemption",
        td.tender_fee_exemption AS "tenderFeeExemption",
        td.emd_amount AS "emdAmount",
        td.tender_fee AS "tenderFee",
        td.location AS "location",
        jsonb_agg(json_build_object(
             'fullName', COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,''),
             'profileUrl', ud.image_url
        )) AS "assignedUser"
   FROM
        tender_details td
   LEFT JOIN
        tender_assigned_users tau ON tau.tender_id = td.id
   LEFT JOIN
        tender_stage ts ON td.tender_stage = ts.id
   LEFT JOIN
        tender_type tt ON td.tender_type = tt.id
   LEFT JOIN
        user_detail ud ON tau.user_id = ud.user_id
   WHERE
        td.id IN (
             SELECT tau.tender_id
             FROM tender_assigned_users tau
             WHERE tau.user_id = :userId
             )
   GROUP BY
        td.id, tt.tender_type_name, ts.tender_stage_name,ts.color,ts.stage_value
""";

        public static final String COUNT_QUERY = """
                SELECT Count(td.id)
                From tender_details td
                """;

        public static final String TENDER_TIMELINE = """
SELECT
    th.created_on AS createdOn,
    th.name AS stage,
    COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,'') AS createdBy,
    ud.image_url as profileUrl
FROM
    tender_history th
LEFT JOIN
    user_detail ud ON th.created_by = ud.user_id
WHERE
    th.tender_id = :tenderId
ORDER BY
    th.created_on
""";

        public static final String TENDER_NOTES_BY_TENDER_ID = """
SELECT
    tn.created_on AS createdOn,
    tn.note AS note,
    ud.user_id AS userId,
    COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,'') AS createdBy,
    ud.image_url as profileUrl
FROM
    tender_notes tn
LEFT JOIN
    user_detail ud ON tn.created_by = ud.user_id
WHERE
    tn.tender_id = :tenderId
ORDER BY
    tn.created_on
""";
        public static final String DOCUMENTS_BY_TENDER_ID = """
    SELECT
        td.created_on AS createdOn,
        td.document_name AS documentName,
        td.document_url AS documentUrl,
        td.extension AS extension,
        COALESCE(ud.firstname,'') || COALESCE(' ' || ud.middlename || ' ',' ')  || COALESCE(ud.lastname,'') AS createdBy,
        ud.image_url as profileUrl
    FROM
        tender_documents td
    LEFT JOIN
        user_detail ud ON td.created_by = ud.user_id
    WHERE
        td.tender_id = :tenderId
    ORDER BY
        td.created_on
    """;

    }

        public class TenderDashboardQuery {
            public static final String PROJECT_VALUE_BY_TENDER_STAGE_VALUE = """
    SELECT
        SUM(td.project_value) AS projectValue,
        COUNT(td.tender_stage) AS projectCount,
        ts.stage_value AS stageValue
    FROM
        tender_details td
        LEFT JOIN tender_stage ts ON td.tender_stage = ts.id
    WHERE
        ts.status = true
        AND (CASE WHEN CAST(:startDate AS Date) IS NOT null AND CAST(:endDate AS Date) IS NOT null THEN
            CAST(td.created_on AS Date) >= :startDate AND CAST(td.created_on AS Date) <= :endDate
        ELSE
            true
        END)
    GROUP BY
        ts.stage_value
    ORDER BY
        ts.stage_value
""";


            public static final String EMD_AMOUNT_AND_TENDER_FEE_BY_TENDER_STAGE_VALUE = """
        SELECT
          sum(emd_amount) AS emdAmount,
          sum(tender_fee) AS tenderFee,
          count(td.tender_stage) AS projectCount,
          ts.stage_value AS stageValue
        FROM
          tender_details td
          FULL JOIN tender_stage ts ON td.tender_stage = ts.id
        WHERE
          ts.status = true
       AND (CASE WHEN CAST(:startDate AS Date) IS NOT null AND CAST(:endDate AS Date) IS NOT null THEN
        CAST(td.created_on AS Date)>= :startDate AND CAST(td.created_on AS Date ) <=  :endDate
             ELSE
                 true
        END
        )
        GROUP BY
          ts.stage_value
        ORDER BY
        ts.stage_value
        """;

            public static final String PROJECT_VALUE_BY_EACH_TENDER_STAGE = """
    SELECT
        SUM(project_value) AS projectValue,
        COUNT(td.tender_stage) AS projectCount,
        ts.tender_stage_name AS tenderStageName
    FROM
        tender_details td
        LEFT JOIN tender_stage ts ON td.tender_stage = ts.id
    WHERE
        ts.status = true
        AND (CASE WHEN CAST(:startDate AS Date) IS NOT null AND CAST(:endDate AS Date) IS NOT null THEN
            CAST(td.created_on AS Date) >= :startDate AND CAST(td.created_on AS Date) <= :endDate
        ELSE
            true
        END)
    GROUP BY
        ts.id
            ORDER BY
        ts.id
""";

            public static final String PROJECT_VALUE_BY_EACH_TENDER_TYPE = """
    SELECT
        sum(project_value) AS projectValue,
        count(td.tender_type) AS projectCount,
        tt.tender_type_name AS tenderStageType
    FROM
        tender_details td
        LEFT JOIN tender_type tt ON td.tender_type = tt.id
    WHERE
        tt.status = true
        AND (CASE WHEN CAST(:startDate AS Date) IS NOT null AND CAST(:endDate AS Date) IS NOT null THEN
            CAST(td.created_on AS Date) >= :startDate AND CAST(td.created_on AS Date) <= :endDate
        ELSE
            true
        END)
    GROUP BY
        tt.id
            ORDER BY
        tt.id
""";



            public static final String PROJECT_VALUE_AND_PROJECT_COUNTS_BY_MONTH = """
        SELECT
          to_char(months, 'Month') AS month_name,
          DATE_TRUNC('month', months) AS month,
          COALESCE(SUM(project_value), 0) AS project_value,
          COALESCE(COUNT(td.tender_stage), 0) AS project_count,
          ts.stage_value AS stageValue
        FROM
          generate_series(
            (SELECT MIN(DATE_TRUNC('month', created_on)) FROM tender_details),
            (SELECT MAX(DATE_TRUNC('month', created_on)) FROM tender_details),
            '1 month'
          ) AS months
          LEFT JOIN tender_details td ON DATE_TRUNC('month', created_on) = months
          LEFT JOIN tender_stage ts ON td.tender_stage = ts.id
        WHERE
          ts.status = true
        GROUP BY
          months.months, ts.stage_value
        ORDER BY
          month, ts.stage_value
        """;

            public static final String LAST_FIVE_TENDER_HISTORY = """
        SELECT
          td.project_name,
          th.name,
          COALESCE(ud.firstname, '') || COALESCE(' ' || ud.middlename || ' ', '') || COALESCE(ud.lastname, '') AS fullName,
          ud.image_url
        FROM
          tender_details td
          LEFT JOIN tender_history th ON td.id = th.tender_id
          LEFT JOIN user_detail ud ON th.created_by = ud.user_id
        ORDER BY
          th.created_on DESC
        LIMIT 5
        """;
        }


    public class TenderHistoryConstant {
        public static final String ADD_NEW_TENDER = "Tender Created By ";
        public static final String ADD_NEW_MEMBER = " Was added By ";
        public static final String STAGED_CHANGED = "Staged Changed to ";

        public static String UPLOADED_BY = "Uploaded By";
    }
}
