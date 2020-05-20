function phoneSecret(phone) {
   let mphone = phone.substring(0, 3) + '****' + phone.substring(7);
   return mphone;
}

module.exports = {
	phoneSecret
};
