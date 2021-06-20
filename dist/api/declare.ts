import { AuthenticationSDK } from "./sdk.extend.authentication";
import { MasterSDK } from "./sdk.extend.master"; 

export declare var AuthenticationSDKClient: AuthenticationSDK;
AuthenticationSDKClient = AuthenticationSDK.getInstance();

export declare var MasterSDKClient: MasterSDK;
MasterSDKClient = MasterSDK.getInstance(); 