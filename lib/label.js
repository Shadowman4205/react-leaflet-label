"use strict";

var _leafletHeadless = require("leaflet-headless");

var _leafletHeadless2 = _interopRequireDefault(_leafletHeadless);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

!function (t) {
	_leafletHeadless2.default.labelVersion = "0.2.2-dev", module.exports = _leafletHeadless2.default.Label = _leafletHeadless2.default.Class.extend({ includes: _leafletHeadless2.default.Mixin.Events, options: { className: "", clickable: !1, direction: "right", noHide: !1, offset: [12, -15], opacity: 1, zoomAnimation: !0 }, initialize: function initialize(t, i) {
			_leafletHeadless2.default.setOptions(this, t), this._source = i, this._animated = _leafletHeadless2.default.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1;
		}, onAdd: function onAdd(t) {
			this._map = t, this._pane = this.options.pane ? t._panes[this.options.pane] : this._source instanceof _leafletHeadless2.default.Marker ? t._panes.markerPane : t._panes.popupPane, this._container || this._initLayout(), this._pane.appendChild(this._container), this._initInteraction(), this._update(), this.setOpacity(this.options.opacity), t.on("moveend", this._onMoveEnd, this).on("viewreset", this._onViewReset, this), this._animated && t.on("zoomanim", this._zoomAnimation, this), _leafletHeadless2.default.Browser.touch && !this.options.noHide && (_leafletHeadless2.default.DomEvent.on(this._container, "click", this.close, this), t.on("click", this.close, this));
		}, onRemove: function onRemove(t) {
			this._pane.removeChild(this._container), t.off({ zoomanim: this._zoomAnimation, moveend: this._onMoveEnd, viewreset: this._onViewReset }, this), this._removeInteraction(), this._map = null;
		}, setLatLng: function setLatLng(t) {
			return this._latlng = _leafletHeadless2.default.latLng(t), this._map && this._updatePosition(), this;
		}, setContent: function setContent(t) {
			return this._previousContent = this._content, this._content = t, this._updateContent(), this;
		}, close: function close() {
			var t = this._map;t && (_leafletHeadless2.default.Browser.touch && !this.options.noHide && (_leafletHeadless2.default.DomEvent.off(this._container, "click", this.close), t.off("click", this.close, this)), t.removeLayer(this));
		}, updateZIndex: function updateZIndex(t) {
			this._zIndex = t, this._container && this._zIndex && (this._container.style.zIndex = t);
		}, setOpacity: function setOpacity(t) {
			this.options.opacity = t, this._container && _leafletHeadless2.default.DomUtil.setOpacity(this._container, t);
		}, _initLayout: function _initLayout() {
			this._container = _leafletHeadless2.default.DomUtil.create("div", "leaflet-label " + this.options.className + " leaflet-zoom-animated"), this.updateZIndex(this._zIndex);
		}, _update: function _update() {
			this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updatePosition(), this._container.style.visibility = "");
		}, _updateContent: function _updateContent() {
			this._content && this._map && this._prevContent !== this._content && "string" == typeof this._content && (this._container.innerHTML = this._content, this._prevContent = this._content, this._labelWidth = this._container.offsetWidth);
		}, _updatePosition: function _updatePosition() {
			var t = this._map.latLngToLayerPoint(this._latlng);this._setPosition(t);
		}, _setPosition: function _setPosition(t) {
			var i = this._map,
			    n = this._container,
			    o = i.latLngToContainerPoint(i.getCenter()),
			    s = i.layerPointToContainerPoint(t),
			    a = this.options.direction,
			    l = this._labelWidth,
			    h = _leafletHeadless2.default.point(this.options.offset);"right" === a || "auto" === a && s.x < o.x ? (_leafletHeadless2.default.DomUtil.addClass(n, "leaflet-label-right"), _leafletHeadless2.default.DomUtil.removeClass(n, "leaflet-label-left"), t = t.add(h)) : (_leafletHeadless2.default.DomUtil.addClass(n, "leaflet-label-left"), _leafletHeadless2.default.DomUtil.removeClass(n, "leaflet-label-right"), t = t.add(_leafletHeadless2.default.point(-h.x - l, h.y))), _leafletHeadless2.default.DomUtil.setPosition(n, t);
		}, _zoomAnimation: function _zoomAnimation(t) {
			var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();this._setPosition(e);
		}, _onMoveEnd: function _onMoveEnd() {
			this._animated && "auto" !== this.options.direction || this._updatePosition();
		}, _onViewReset: function _onViewReset(t) {
			t && t.hard && this._update();
		}, _initInteraction: function _initInteraction() {
			if (this.options.clickable) {
				var t = this._container,
				    i = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];_leafletHeadless2.default.DomUtil.addClass(t, "leaflet-clickable"), _leafletHeadless2.default.DomEvent.on(t, "click", this._onMouseClick, this);for (var n = 0; n < i.length; n++) {
					_leafletHeadless2.default.DomEvent.on(t, i[n], this._fireMouseEvent, this);
				}
			}
		}, _removeInteraction: function _removeInteraction() {
			if (this.options.clickable) {
				var t = this._container,
				    i = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];_leafletHeadless2.default.DomUtil.removeClass(t, "leaflet-clickable"), _leafletHeadless2.default.DomEvent.off(t, "click", this._onMouseClick, this);for (var n = 0; n < i.length; n++) {
					_leafletHeadless2.default.DomEvent.off(t, i[n], this._fireMouseEvent, this);
				}
			}
		}, _onMouseClick: function _onMouseClick(t) {
			this.hasEventListeners(t.type) && _leafletHeadless2.default.DomEvent.stopPropagation(t), this.fire(t.type, { originalEvent: t });
		}, _fireMouseEvent: function _fireMouseEvent(t) {
			this.fire(t.type, { originalEvent: t }), "contextmenu" === t.type && this.hasEventListeners(t.type) && _leafletHeadless2.default.DomEvent.preventDefault(t), "mousedown" !== t.type ? _leafletHeadless2.default.DomEvent.stopPropagation(t) : _leafletHeadless2.default.DomEvent.preventDefault(t);
		} }), _leafletHeadless2.default.BaseMarkerMethods = { showLabel: function showLabel() {
			return this.label && this._map && (this.label.setLatLng(this._latlng), this._map.showLabel(this.label)), this;
		}, hideLabel: function hideLabel() {
			return this.label && this.label.close(), this;
		}, setLabelNoHide: function setLabelNoHide(t) {
			this._labelNoHide !== t && (this._labelNoHide = t, t ? (this._removeLabelRevealHandlers(), this.showLabel()) : (this._addLabelRevealHandlers(), this.hideLabel()));
		}, bindLabel: function bindLabel(t, i) {
			var n = this.options.icon ? this.options.icon.options.labelAnchor : this.options.labelAnchor,
			    o = _leafletHeadless2.default.point(n) || _leafletHeadless2.default.point(0, 0);return o = o.add(_leafletHeadless2.default.Label.prototype.options.offset), i && i.offset && (o = o.add(i.offset)), i = _leafletHeadless2.default.Util.extend({ offset: o }, i), this._labelNoHide = i.noHide, this.label || (this._labelNoHide || this._addLabelRevealHandlers(), this.on("remove", this.hideLabel, this).on("move", this._moveLabel, this).on("add", this._onMarkerAdd, this), this._hasLabelHandlers = !0), this.label = new _leafletHeadless2.default.Label(i, this).setContent(t), this;
		}, unbindLabel: function unbindLabel() {
			return this.label && (this.hideLabel(), this.label = null, this._hasLabelHandlers && (this._labelNoHide || this._removeLabelRevealHandlers(), this.off("remove", this.hideLabel, this).off("move", this._moveLabel, this).off("add", this._onMarkerAdd, this)), this._hasLabelHandlers = !1), this;
		}, updateLabelContent: function updateLabelContent(t) {
			this.label && this.label.setContent(t);
		}, getLabel: function getLabel() {
			return this.label;
		}, _onMarkerAdd: function _onMarkerAdd() {
			this._labelNoHide && this.showLabel();
		}, _addLabelRevealHandlers: function _addLabelRevealHandlers() {
			this.on("mouseover", this.showLabel, this).on("mouseout", this.hideLabel, this), _leafletHeadless2.default.Browser.touch && this.on("click", this.showLabel, this);
		}, _removeLabelRevealHandlers: function _removeLabelRevealHandlers() {
			this.off("mouseover", this.showLabel, this).off("mouseout", this.hideLabel, this), _leafletHeadless2.default.Browser.touch && this.off("click", this.showLabel, this);
		}, _moveLabel: function _moveLabel(t) {
			this.label.setLatLng(t.latlng);
		} }, _leafletHeadless2.default.Icon.Default.mergeOptions({ labelAnchor: new _leafletHeadless2.default.Point(9, -20) }), _leafletHeadless2.default.Marker.mergeOptions({ icon: new _leafletHeadless2.default.Icon.Default() }), _leafletHeadless2.default.Marker.include(_leafletHeadless2.default.BaseMarkerMethods), _leafletHeadless2.default.Marker.include({ _originalUpdateZIndex: _leafletHeadless2.default.Marker.prototype._updateZIndex, _updateZIndex: function _updateZIndex(t) {
			var e = this._zIndex + t;this._originalUpdateZIndex(t), this.label && this.label.updateZIndex(e);
		}, _originalSetOpacity: _leafletHeadless2.default.Marker.prototype.setOpacity, setOpacity: function setOpacity(t, e) {
			this.options.labelHasSemiTransparency = e, this._originalSetOpacity(t);
		}, _originalUpdateOpacity: _leafletHeadless2.default.Marker.prototype._updateOpacity, _updateOpacity: function _updateOpacity() {
			var t = 0 === this.options.opacity ? 0 : 1;this._originalUpdateOpacity(), this.label && this.label.setOpacity(this.options.labelHasSemiTransparency ? this.options.opacity : t);
		}, _originalSetLatLng: _leafletHeadless2.default.Marker.prototype.setLatLng, setLatLng: function setLatLng(t) {
			return this.label && !this._labelNoHide && this.hideLabel(), this._originalSetLatLng(t);
		} }), _leafletHeadless2.default.CircleMarker.mergeOptions({ labelAnchor: new _leafletHeadless2.default.Point(0, 0) }), _leafletHeadless2.default.CircleMarker.include(_leafletHeadless2.default.BaseMarkerMethods), _leafletHeadless2.default.Path.include({ bindLabel: function bindLabel(t, i) {
			return this.label && this.label.options === i || (this.label = new _leafletHeadless2.default.Label(i, this)), this.label.setContent(t), this._showLabelAdded || (this.on("mouseover", this._showLabel, this).on("mousemove", this._moveLabel, this).on("mouseout remove", this._hideLabel, this), _leafletHeadless2.default.Browser.touch && this.on("click", this._showLabel, this), this._showLabelAdded = !0), this;
		}, unbindLabel: function unbindLabel() {
			return this.label && (this._hideLabel(), this.label = null, this._showLabelAdded = !1, this.off("mouseover", this._showLabel, this).off("mousemove", this._moveLabel, this).off("mouseout remove", this._hideLabel, this)), this;
		}, updateLabelContent: function updateLabelContent(t) {
			this.label && this.label.setContent(t);
		}, _showLabel: function _showLabel(t) {
			this.label.setLatLng(t.latlng), this._map.showLabel(this.label);
		}, _moveLabel: function _moveLabel(t) {
			this.label.setLatLng(t.latlng);
		}, _hideLabel: function _hideLabel() {
			this.label.close();
		} }), _leafletHeadless2.default.Map.include({ showLabel: function showLabel(t) {
			return this.addLayer(t);
		} }), _leafletHeadless2.default.FeatureGroup.include({ clearLayers: function clearLayers() {
			return this.unbindLabel(), this.eachLayer(this.removeLayer, this), this;
		}, bindLabel: function bindLabel(t, e) {
			return this.invoke("bindLabel", t, e);
		}, unbindLabel: function unbindLabel() {
			return this.invoke("unbindLabel");
		}, updateLabelContent: function updateLabelContent(t) {
			this.invoke("updateLabelContent", t);
		} });
}(window, document); /*
                     	Leaflet.label, a plugin that adds labels to markers and vectors for Leaflet powered maps.
                     	(c) 2012-2013, Jacob Toye, Smartrak
                     
                     	https://github.com/Leaflet/Leaflet.label
                     	http://leafletjs.com
                     	https://github.com/jacobtoye
                     */
