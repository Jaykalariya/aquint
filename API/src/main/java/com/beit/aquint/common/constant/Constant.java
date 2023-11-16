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
}
