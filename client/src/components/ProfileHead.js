import React, { Component } from 'react';

export default class ProfileHead extends Component {
  constructor(props) {
    super(props);
    this.state = {pos:0, toggle:false};
    this.mousemove = this.mousemove.bind(this);
  }

  mousemove(e) {
      let body = document.body.getBoundingClientRect();
      let elem = this.elem.getBoundingClientRect();
      let mouse = [e.clientX, e.clientY];
      let center = [body.left+elem.left+80, body.top+80+elem.top];
      

      let rad = Math.atan2(mouse[0] - center[0], mouse[1] - center[1]);
      let pos = Math.round((rad + Math.PI)/(0.25*Math.PI)+1);
      pos = (pos == 9) ? 1 : pos
      this.setState({pos:pos});
  }
  componentDidMount() {
    document.body.addEventListener('mousemove', this.mousemove, false);

  }
  componentWillUnmount() {
    document.body.removeEventListener('mousemove', this.mousemove, false);
  }

  render() {
    let {people, image} = this.props;
    let style = (image) ? {
                  backgroundImage:'url(/people.jpg)',
                  backgroundPositionY: `-${167*this.props.pos}px`,
                  backgroundPositionX: `-${167*this.state.pos}px`} : {}
    
    return (
                <div className='profile-head' ref={(ref) => this.elem = ref} style={style}
                  onClick={()=>this.setState({toggle:!this.state.toggle})}
                >

                    <div className="element" 
                      style={{
                            position: 'absolute',
                            bottom: '0',
                            background: '#1a3445',
                            color: 'white',
                            padding: '2px 6px 5px 6px',
                            fontWeight: 'bold'}}>{people.name.toLowerCase().split(' ')[0][0]+people.name.toLowerCase().split(' ')[1][0]}


                    </div>
                       <div className="description" style={this.props.last ? {right: '0'}: {}}>
                        <div className="name">{people.name}</div>
                       
                        <div className="title">{people.title}</div>
                        

                      </div>
                </div>
    );
  }
}
