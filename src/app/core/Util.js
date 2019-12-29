/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-28 15:30:08
 * @modify date 2019-12-28 15:30:08
 * @desc Util methods.
 */

exports.isValid = (v) => {
  return v !== null && v !== undefined && v !== '' && JSON.stringify(v) !== '{}' && v !== 'null';
};

exports.isValidObject = (v) => {
  const keys = Object.keys(v);

  for (let i = 0; i < keys.length; i++) {
    if (!this.isValid(v[keys[i]])) {
      return false;
    }
  }

  return true;
}