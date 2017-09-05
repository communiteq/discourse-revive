export default Ember.Component.extend({
  visible: true,
  slot: null,

  init() {
    this._super();

    const { siteSettings } = this;
    const slot = this.get('slot').trim();
    const position = slot.replace('_mobile', '');
    this.set('revivehost', (siteSettings.revive_adserver_host || '').trim());
    this.set('slot', slot);

    const userSee = (!this.currentUser) ||
      (this.currentUser.get('trust_level') <= siteSettings.revive_through_trust_level);

    if (userSee && siteSettings[`revive_show_${position}`]) {
      var zoneid = Discourse.SiteSettings['revive_'+ slot + '_zone_id'];
      if (isNaN(parseFloat(zoneid)) || !isFinite(zoneid)) {
          return;
      }
      this.set('visible', true);
      this.set('zoneid', zoneid);
      const { width, height } = this.getProperties('width', 'height');
      this.set('width', width);
      this.set('height', height);
      this.set('rnd', Math.floor((Math.random() * 100000) + 1));
    }
  }

});
