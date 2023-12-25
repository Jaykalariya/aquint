
export interface TableColumn {
    field: string;
    header: string;
    dataType?: commontTableDataType
}

export interface TableData {
    columns: TableColumn[];
    data: any[];
}

export enum commontTableDataType {
    normal,
    innerHtml,
    dateTime,
    userAvatar,
    studentAvatar,
    currency,
    verificationStutus,
    anchor,
    multiAvatar
}

export interface ApplyTableExtraInfo {
    tableClass?: string;
    title?: string;
    createNewBtnText?: string;
    generalNewBtnText?: string;
    createNewBtnText2?: string;
    actions? : CommonTableAction[];
}

export interface CommonTableAction {
    label: string;
    cssClass?: string;
    icon?: string;
    onClick({ data, sourceEvent, }: {
        data: any;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
}

export interface PageHeaderItem {
    title: string | null;
    url?: string | null;
    active?: boolean | null;
}

export interface Role{
    id: number | null;
    name: string | null;
    status: string | null;
}

export interface TenderStage{
    id: number | null;
    tenderStageName: string | null;
    status: boolean;
    statusHtml: string | null;
}

export interface TenderType{
    id: number | null;
    tenderTypeName: string | null;
    status: boolean;
}

export interface Department{
    id: number | null;
    departmentName: string;
    status: boolean;
}

export interface Division{
    id: number | null;
    divisionName: string;
    status: boolean;
}

export interface Product{
    id: number | null;
    name: string;
    status: boolean;
}

export interface PlaceOfSupply{
    id: number | null;
    stateName: string;
    stateCode: string;
    status: boolean;
}