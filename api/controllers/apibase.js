/**
 * Created by Zhongyi on 6/18/16.
 */

"use strict";

let _parseCookies = (cookie) => {
  var list = {},

      rc = cookie;

  rc && rc.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
};

module.exports = {
  apiwrap: (func) => {
    return (req, res) => {
      let cookies = _parseCookies(req.swagger.params.Cookie.value);
      return func(req, res, cookies.uid);
    }
  }
};