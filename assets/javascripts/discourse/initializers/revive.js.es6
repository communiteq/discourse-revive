export default {
  name: "apply-revive",
  initialize: function(container) {
    Em.Handlebars.helper('reviveBlock', function(width, height, slotid) {
      var currentUser = Discourse.User.current();
      if ((currentUser) && ( currentUser.get('trust_level') > Discourse.SiteSettings.revive_through_trust_level )) {
        return "";
      }

      var position = slotid.replace('_mobile', '');

      if (Discourse.SiteSettings['revive_show_' + position]) {

        var zoneid = Discourse.SiteSettings['revive_'+ slotid + '_zone_id'];
        if (isNaN(parseFloat(zoneid)) || !isFinite(zoneid)) {
            return "";
        }
        var revivehost = Discourse.SiteSettings['revive_adserver_host'];
        if (revivehost == "") {
            return "";
        }
        var rnd = Math.floor((Math.random() * 100000) + 1);
        var cl = 'revive';
        if (position != slotid) { // mobile
            cl += ' mobile';
        }
        return new Handlebars.SafeString(
            '<iframe class="revive-ad ' + slotid + '" id="af19849f" name="af19849f" ' +
                'src="//' + revivehost + '/www/delivery/afr.php?zoneid=' + zoneid + '&amp;cb=' + rnd + '" ' +
                'frameborder="0" scrolling="no" width="' + width + '" height="' + height + '">' +
                '<a href="//' + revivehost + '/www/delivery/ck.php?n=abc1aa1e&amp;cb=' + rnd + '" target="_blank">' +
                '<img src="//' + revivehost + '/www/delivery/avw.php?zoneid=' + zoneid + '&amp;cb=' + rnd + '&amp;n=abc1aa1e" border="0" alt="" /></a></iframe>'
        );
      }

      return "";
    });
  }
}
