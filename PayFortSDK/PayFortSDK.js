/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import payFort from './src/Component/PayFort/PayFort';
import { NativeModules, Platform, PermissionsAndroid } from "react-native";
const { PayFort } = NativeModules;

const RNPayFort = async parameter => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return new Promise(async (resolve, reject) => {
          if (
            parameter.command &&
            parameter.access_code &&
            parameter.merchant_identifier &&
            parameter.sha_request_phrase &&
            parameter.email &&
            parameter.language &&
            parameter.amount &&
            parameter.currencyType &&
            parameter.testing
          ) {
            await PayFort.Pay(
              JSON.stringify(parameter),
              successResponseData => {
                resolve(JSON.parse(successResponseData));
              },
              errorResponseData => {
                reject(JSON.parse(errorResponseData));
              }
            );
          } else {
            reject({
              response_code: "MissingParameter",
              response_message: "Please enter all required Parameter."
            });
          }
        });
      } else {
        console.log("Read phone state permission denied");
        return new Promise(async (resolve, reject) => {
          reject({
            response_code: "PermissionRequired",
            response_message: "Grant permission for Read phone state."
          });
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }
  if (Platform.OS === "ios") {
    return new Promise(async (resolve, reject) => {
      if (
        parameter.command &&
        parameter.access_code &&
        parameter.merchant_identifier &&
        parameter.sha_request_phrase &&
        parameter.email &&
        parameter.language &&
        parameter.amount &&
        parameter.currencyType &&
        parameter.testing
      ) {
        await PayFort.Pay(
          JSON.stringify(parameter),
          successResponseData => {
            resolve(successResponseData);
          },
          errorResponseData => {
            reject(errorResponseData);
          }
        );
      } else {
        reject({
          response_code: "MissingParameter",
          response_message: "Please enter all required Parameter."
        });
      }
    });
  }
};

export default RNPayFort;
