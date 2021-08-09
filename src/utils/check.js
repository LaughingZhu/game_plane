function checkTel(val) {
  if (val === '') {
    return false;
  }
  let telReg =
    /^1[3|4|5|7|8]\d{9}$|^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  if (!telReg.test(val)) {
    return false;
  }
  return true;
}

function checkMail(val) {
  if (val === '') {
    return false;
  }
  let mailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!mailReg.test(val)) {
    return false;
  }
  return true;
}
export default {
  checkTel,
  checkMail,
};
