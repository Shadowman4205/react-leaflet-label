'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _reactDom = require('react-dom');

var _leaflet = require('leaflet');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _reactLeaflet = require('react-leaflet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Label = function (_MapComponent) {
  _inherits(Label, _MapComponent);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Label).apply(this, arguments));
  }

  _createClass(Label, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Label.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var _children = _props.children;
      var _map = _props.map;
      var labelContainer = _props.labelContainer;

      var props = _objectWithoutProperties(_props, ['children', 'map', 'labelContainer']);

      this.leafletElement = new _label2.default(props, labelContainer);
      this.leafletElement.on('open', this.renderLabelContent.bind(this));
      this.leafletElement.on('close', this.removeLabelContent.bind(this));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props;
      var map = _props2.map;
      var labelContainer = _props2.labelContainer;
      var position = _props2.position;
      var latlng = _props2.latlng;

      var el = this.leafletElement;
      el.setLatLng(latlng);

      if (labelContainer) {
        labelContainer.bindLabel(el);
      }
      map.showLabel(el);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var position = this.props.position;

      if (this.leafletElement._isOpen) {
        this.renderLabelContent();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Label.prototype), 'componentWillUnmount', this).call(this);
      this.removeLabelContent();
      if (this.leafletElement._map !== null) {
        this.props.map.removeLayer(this.leafletElement);
      }
    }
  }, {
    key: 'renderLabelContent',
    value: function renderLabelContent() {
      if (this.props.children) {
        (0, _reactDom.render)(_react.Children.only(this.props.children), this.leafletElement._contentNode);

        this.leafletElement._updateLayout();
        this.leafletElement._updatePosition();
      } else {
        this.removeLabelContent();
      }
    }
  }, {
    key: 'removeLabelContent',
    value: function removeLabelContent() {
      if (this.leafletElement._contentNode) {
        (0, _reactDom.unmountComponentAtNode)(this.leafletElement._contentNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Label;
}(_reactLeaflet.MapComponent);

Label.propTypes = {
  children: _react.PropTypes.node,
  map: _react.PropTypes.instanceOf(_leaflet.Map),
  labelContainer: _react.PropTypes.object
};
exports.default = Label;