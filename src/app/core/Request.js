/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-28 23:01:46
 * @modify date 2019-12-28 23:01:46
 * @desc Api request methods.
 */

 exports.response = (data, error = false) => {
    const responseBody = {
        error: null,
        result: null
    };
    
    if (!error) {
        responseBody.result = data;

        return responseBody;
     }

    responseBody.error = data;

    return responseBody;
 }
