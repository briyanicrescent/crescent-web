const crescentServiceUrl = import.meta.env.VITE_CRESCENT_SERVICE_URL
export const getActiveBranchesUrl = crescentServiceUrl + "/branch/active";
export const authorizeUrl = crescentServiceUrl + "/auth/authorize";
export const userDetailsUrl = crescentServiceUrl + "/user/details";
export const updateUserUrl = crescentServiceUrl + "/user";
export const getRefreshedTokenUrl = crescentServiceUrl + "/auth/getRefreshedToken";
export const getActiveProductUrl = crescentServiceUrl + "/product/";
export const getDeliveryChargesUrl = crescentServiceUrl + "/delivery/charges";
export const getAddressUrl = crescentServiceUrl + "/address/";
export const createAddressUrl = crescentServiceUrl + "/address";
export const updateAddressUrl = crescentServiceUrl + "/address";