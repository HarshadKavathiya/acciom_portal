import pymysql

# db_name = "source_db";
# table_name = "src_inventory";

db_name = "dest_db";
table_name = "dest_inventory";

user_name = "Acciom_user";
password = "Acciomuser";
host = "localhost"

connection = pymysql.connect(host=host, user=user_name, password=password,
                             db=db_name)
cursor = connection.cursor()

var = "create table {0}(Company_key int(11),CTL_ID int(11),DELETE_FLAG varchar(2),ID varchar(18),ISDELETED varchar(5),CORDID varchar(18),NAMEY varchar(127),TYPEY varchar(127),CHILDID varchar(18),BILLTREET varchar(127),CITY varchar(40),A_BILLINGSTATE varchar(80),A_BILLINGPOSTALCODE varchar(20),A_BILLINGCOUNTRY varchar(80),A_BILLINGSTATECODE varchar(127),A_BILLINGCOUNTRYCODE varchar(127),A_BILLINGLATITUDE decimal(18,0),A_BILLINGLONGITUDE decimal(18,0),A_BILLINGGEOCODEACCURACY varchar(127),A_BILLINGADDRESS varchar(127),STREET varchar(127),CITY_1 varchar(40),STATE varchar(80),POSTALCODE varchar(20),COUNTRY varchar(80),STATECODE varchar(127),COUNTRYCODE varchar(127),LATITUDE decimal(18,0),LONGITUDE decimal(18,0),CODEACCURACY varchar(127),A_ADDRESS varchar(127),X_PHONE varchar(40),F_FAX varchar(40),X_ACCOUNTNUMBER varchar(40),WEBSITE varchar(127),PHOTOURL varchar(127),SIL varchar(20),INDUSTRIES varchar(127),REVENUE decimal(24,0),NO_EMPLOYEES int(11),X_OWNERSHIP varchar(127),B_TICKERSYMBOL varchar(20),DESCRIBING varchar(127),RATING varchar(127),SITE varchar(80),CURRENCY varchar(127),OWNERID varchar(18),CREATEDDATE datetime,CREATEDID varchar(18),MODIFIEDDATE datetime,MODIFIEDBYID varchar(18),SYSTEMSTAMP datetime,ACTIVITYDATE datetime,VIEWEDDATE datetime,REFERENCEDDATE datetime,V_JIGSAW varchar(20),K_JIGSAWCOMPANYID varchar(20),L_CLEANSTATUS varchar(127),J_ACCOUNTSOURCE varchar(127),DONSNUMBER varchar(9),TRADINGSTYLE varchar(127),K_NAICSCODE varchar(8),M_NAICSDESC varchar(120),STARTEDYEAR varchar(4),SICDESC_P varchar(80),DANDBCOMPANYID_K varchar(18),CONNECTIONID varchar(18),SENTID varchar(18),RECORD_ID varchar(18),ADDED_FROM_DATA_COM decimal(18,0),DATA_COM_MANAGED decimal(18,0),DATA_COM_MATCHED text,DATA_COM_DOES_NOT_A varchar(5),PARENTED_STATUS text,DATA_CLEAN varchar(5),NO_ACCOUNTS decimal(18,0),REVIEW_PRIORITY decimal(18,0),FORTUNE_RANK decimal(18,0),NUMBER_OF_J1_ACCOUNTS decimal(18,0),NUMBER_OF_K2_ACCOUNTS decimal(18,0),NUMBER_OF_L3_ACCOUNTS decimal(18,0),NUMBER_OF_M4_ACCOUNTS decimal(18,0),NUMBER_OF_N5_ACCOUNTS decimal(18,0),N_ACCOUNTS decimal(18,0),NB_ESCALATION_NOTES varchar(127),NUMBER_OF_KL_ACCOUNTS decimal(18,0),COMPANY_LKM_STATUS varchar(127),LAST_REVIEWED_BY_MKJ varchar(127),KLMJ_CUSTOMER varchar(5),NUM_OF_ACCOUNTS_KLMNBG decimal(18,0),HIGHEST_COMPANY_NAME text,MATCHED_COM_ON_KFD datetime,PL_REVIEWED_ON datetime,EVER_ON varchar(5),ALL_OWNED varchar(5),SUPPORT_OFFICER varchar(127),DATA_MIGRATION_P varchar(127),DELETE_RECORD_OFF varchar(5),DATA_QUALITY_ON text,DATA_QUALITY_OFF decimal(18,0),DELETEDRAINKING varchar(5),KJ_COMPANYID decimal(18,0),MK_DEFAULTVISIBILITY varchar(127),NB_RETRIEVALFLAG varchar(127),MS_COMPANY_ID varchar(80),APPLICATIONS_HOSTED_AT varchar(127),BILLING_COUNTY_AM varchar(127),BUDGET decimal(24,0),CLOUD_IN_CUSTOMER text,COMPANY_ACCESS_SUBMIT varchar(18),COMPANY_LOGO text,COMPANY_PRIORITY decimal(18,0),COMPANY_REGISTRATION varchar(50),COMPLIANCE_REGULATING varchar(127),COUNTRY_SUPPORTED varchar(5),KL_PROFILENAME text,KJ_CRUNCHBASE varchar(127),CR_CUSTOM_REVENUE decimal(18,0),NO_ACTIVELY_WORKING varchar(5),GH_ASSIGNED_DATE datetime,N_HOSTING_PROVIDER text,JKLMHNH varchar(127),MKK decimal(24,0),KLNK_SECTOR varchar(127),OLD_FGJ datetime,OPT_UIO varchar(5),OTHER_HOSTED varchar(127),L_RECORD_ID varchar(100),N_REFERENCE_ACCOUNT varchar(5),M_SEARCH_IN_HOOVERS text,KLOI_COUNTY varchar(127),STATUSX_OP varchar(127),SUBSIDIARY_OPL text,KLL_NUMBER varchar(100),CLOSED_KNK decimal(18,0),OPEN_JKJNK decimal(18,0),OWNER_NAME text,TERRITORY varchar(127),Start_Date datetime,Effective_Date datetime,Current_Record_Taken int(11),dg_timestamp datetime,Updated_date_on datetime,Company_Id_by varchar(18),Company_Deleted_on varchar(5),Company_Name_hj varchar(127),Company_Type_lm varchar(127),Company_Parent_Id_jkl varchar(18),Company_kklm_Street varchar(127),Company_Kl_City varchar(40),Company_Bklling_State varchar(80),Company_Nm_Postal_Code varchar(20),Company_Bl_Country varchar(80),Company_Bs_State_Code varchar(127),Company_Bp_Country_Code varchar(127),Company_Be_Address varchar(127),Company_Sa_Street varchar(127),Company_Sa_City varchar(40),Company_Sa_State varchar(80),Company_Sa_Postal_Code varchar(20),Company_Sa_Country varchar(80),Company_Sa_State_Code varchar(127),Company_Sa_Country_Code varchar(127),Company_Tin_Style varchar(127),Company_BNJ_Code varchar(8),Company_Sa_Address varchar(127),Company_Sa_County varchar(127),Company_Op_Territory varchar(127),Company_Phone_Lk varchar(40),Company_Fax_Jk varchar(40),Company_Ak_Number varchar(40),Company_Web varchar(127),Company_SIN varchar(20),Company_In varchar(127),Company_Owner varchar(127),Company_Describe varchar(127),Company_Ratingmkl varchar(127),Company_Sited varchar(80),Company_Currency_Ikl varchar(127),mk_Owner_Id varchar(18),mkm_Owner_Name varchar(127),Co_Created_By_Id varchar(18),Company_Cr_Datetime_Utc datetime,Company_Creat_Datetime_Cst datetime,Company_Cleaned_Status varchar(127),Company_Ac_Source varchar(127),Company_Dons_Number varchar(9),Company_NAICJK_Description varchar(120),Company_Yeardcd_Started varchar(4),Company_SICKLMHZX_Description varchar(80),Company_DandBNM_Id varchar(18),Company_Numberskxsmk_Of_Accounts decimal(28,10),Company_Fortuneklm_Rank decimal(28,10),Company_Last_Reviewed_By_op varchar(127),Company_Last_Reviewed_On_lk datetime,Company_Is_Rackspace_Customer_nmm varchar(5),Company_Highest_Level_Name_nms text,Company_Market_Sector_aggh varchar(127),Company_Status_mnxmc varchar(127),Company_skxsj text,Company_sxsnx varchar(100),Company_Start_Datetime_Cstdc datetime,Company_End_Datetime_Cstdc datetime,Company_Start_Datetime_Utcdcd datetime,Company_End_Datetime_Utdcc datetime,Record_Created_By_Dcd varchar(100),Record_Created_Datetime_Dcdk datetime,Record_Updated_By_Cbh varchar(100),Record_Updated_Datetime_jbj datetime);".format(
    table_name)

cursor.execute(var)
connection.commit()

print("Table {} created in {} database".format(table_name, db_name))
