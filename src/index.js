import { Children, PropTypes } from 'react';
import { render, unmountComponentAtNode} from 'react-dom'
import { Map } from 'leaflet'
import label from './label'

import { MapComponent } from 'react-leaflet'

export default class Label extends MapComponent {
  static propTypes = {
    children: PropTypes.node,
    map: PropTypes.instanceOf(Map),
    labelContainer: PropTypes.object
  }
  
  componentWillMount() {
    super.componentWillMount()
    const { children: _children, map: _map, labelContainer, ...props } = this.props
    this.leafletElement = label(props, labelContainer);
    this.leafletElement.on('open', ::this.renderLabelContent)
    this.leafletElement.on('close', ::this.removeLabelContent)    
  }

  componentDidMount() {
    const { map, labelContainer, position } = this.props
    const el = this.leafletElement
  
   if( labelContainer ) {
     labelContainer.bindLabel(el)
   }
   el.openOn(map)
   
  }
  
  componentDidUpdate (prevProps) {
    const { position } = this.props
    if(this.leafletElement._isOpen) {
      this.renderLabelContent()
    }
  }
  
  componentWillUnmount() {
    super.componentWillUnmount()
    this.removeLabelContent()
    if(this.leafletElement._map !== null){
      this.props.map.removeLayer(this.leafletElement)
    }   
  }
  
  renderLabelContent() {
    if(this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode
      )
      
      this.leafletElement._updateLayout()
      this.leafletElement._updatePosition()
    }
    else {
      this.removeLabelContent()
    }
  }
  
  removeLabelContent() {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }
  render() {
    return null
  }
} 