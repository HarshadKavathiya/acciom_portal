import pymysql
DBName = "NewTestDB";
UserName = "Acciom_user";
PWD = "Acciomuser";
TableName = "Inventory_test3";
ranges=1000000   #changes as per required rows to be inserted

connection=pymysql.connect(host="localhost",user=UserName,password=PWD,db=DBName)
cursor=connection.cursor()

Company_key   = 0
CTL_ID  = 0
A_BILLINGLATITUDE  = 0
A_BILLINGLONGITUDE  = 0
LATITUDE  = 0
LONGITUDE  = 0
REVENUE  = 0
NO_EMPLOYEES  = 0
ADDED_FROM_DATA_COM  = 0
DATA_COM_MANAGED  = 0
NO_ACCOUNTS  = 0
REVIEW_PRIORITY  = 0
FORTUNE_RANK  = 0
NUMBER_OF_J1_ACCOUNTS  = 0
NUMBER_OF_K2_ACCOUNTS  = 0
NUMBER_OF_L3_ACCOUNTS  = 0
NUMBER_OF_M4_ACCOUNTS  = 0
NUMBER_OF_N5_ACCOUNTS  = 0
N_ACCOUNTS  = 0
NUMBER_OF_KL_ACCOUNTS  = 0
NUM_OF_ACCOUNTS_KLMNBG  = 0
DATA_QUALITY_OFF  = 0
KJ_COMPANYID  = 0
BUDGET  = 0
COMPANY_PRIORITY  = 0
CR_CUSTOM_REVENUE  = 0
MKK  = 0
CLOSED_KNK  = 0
OPEN_JKJNK  = 0
Current_Record_Taken  = 0
Company_Numberskxsmk_Of_Accounts  = 0
Company_Fortuneklm_Rank  = 0


for i in range(ranges):

    Company_key += 1
    CTL_ID += 1
    A_BILLINGLATITUDE += 0.1
    A_BILLINGLONGITUDE += 0.1
    LATITUDE += 0.1
    LONGITUDE += 0.1
    REVENUE += 0.1
    NO_EMPLOYEES += 1
    ADDED_FROM_DATA_COM += 0.1
    DATA_COM_MANAGED += 0.1
    NO_ACCOUNTS += 0.1
    REVIEW_PRIORITY += 0.1
    FORTUNE_RANK += 0.1
    NUMBER_OF_J1_ACCOUNTS += 0.1
    NUMBER_OF_K2_ACCOUNTS += 0.1
    NUMBER_OF_L3_ACCOUNTS += 0.1
    NUMBER_OF_M4_ACCOUNTS += 0.1
    NUMBER_OF_N5_ACCOUNTS += 0.1
    N_ACCOUNTS += 0.1
    NUMBER_OF_KL_ACCOUNTS += 0.1
    NUM_OF_ACCOUNTS_KLMNBG += 0.1
    DATA_QUALITY_OFF += 0.1
    KJ_COMPANYID += 0.1
    BUDGET += 0.1
    COMPANY_PRIORITY += 0.1
    CR_CUSTOM_REVENUE += 0.1
    MKK += 0.1
    CLOSED_KNK += 0.1
    OPEN_JKJNK += 0.1
    Current_Record_Taken += 1
    Company_Numberskxsmk_Of_Accounts += 0.1
    Company_Fortuneklm_Rank += 0.1


    var = "insert into {} values({},{},'no','abc123','yes','xyz','akhil','int','abc','xyz','Bangalore','Mumbai','540qqe','India','500010','11',{},{},'yz','Whitefield','varthur','bangalore','Ka','560014','india','10001','911',{},{},'1','jpnagar','9909001230','50010','1110','www.acciom.com','xyz.com','xyz','accion',{},{},'abc','999023','lmn','A10','india','1000','12','2019-02-09','20','2019-02-09','33','2019-02-09','2019-02-09','2019-02-09','2019-02-09','YES','XYZ','ZBC','CBC','989','SDF','3BV','VBN','2019','UIO','UI8','IO9','PO9','YT6',{},{},'RYRY','AS7','UI','YES',{},{},{},{},{},{},{},{},{},'EIOIIE',{},'ACTIVE','2012A','US',{},'HIGH','2019-02-09','2019-02-09','E','Y','IND2','XBC','N','OOP',{},'yes',{},'default','no','lmo1','u18','australia',{},'xyz100','submit','acciom',{},'iso','regular','asia','suresh','char',{},'all','2019-02-09','all','xyz',{},'all','2019-02-09','OUT','xyz','op98','xyz','yes','india','pass','ues','98a',{},{},'suresh','india','2019-02-09','2019-02-09',{},'2019-02-09','2019-02-09','acciom19','19k','acciom','software','19a','whitefield','banglore','krk','560014','india','911','9112','goa','21street','margoa','goa','811','india','566','911','51strreet','india','asia','911911122','5334','900899','www.acciom.com','211a','accion_lab','xyz','sw','5','india','ruppee','321a','suresh','32a','akhil','123id','2019-02-09','2019-02-09','op','software','322a','nill','1','xyz','vbn',{},{},'1999a','2019-02-09','nill','xyz','software','active','pass','working','2019-02-09','2019-02-09','2019-02-09','2019-02-09','create','2019-02-09','UPDATED','2019-02-09');".format(TableName,Company_key,CTL_ID,A_BILLINGLATITUDE,A_BILLINGLONGITUDE,LATITUDE,LONGITUDE,REVENUE,NO_EMPLOYEES,ADDED_FROM_DATA_COM,DATA_COM_MANAGED,NO_ACCOUNTS,REVIEW_PRIORITY,FORTUNE_RANK,NUMBER_OF_J1_ACCOUNTS,NUMBER_OF_K2_ACCOUNTS,NUMBER_OF_L3_ACCOUNTS,NUMBER_OF_M4_ACCOUNTS,NUMBER_OF_N5_ACCOUNTS,N_ACCOUNTS,NUMBER_OF_KL_ACCOUNTS,NUM_OF_ACCOUNTS_KLMNBG,DATA_QUALITY_OFF,KJ_COMPANYID,BUDGET,COMPANY_PRIORITY,CR_CUSTOM_REVENUE,MKK,CLOSED_KNK,OPEN_JKJNK,Current_Record_Taken,Company_Numberskxsmk_Of_Accounts,Company_Fortuneklm_Rank)


    cursor.execute(var)
connection.commit()
