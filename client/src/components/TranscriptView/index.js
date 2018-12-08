import React from 'react';
import ShareDBBinding from 'sharedb-react-textbinding';
import IntersectionObserver from 'react-intersection-observer';
import IntersectionVisible from 'react-intersection-visible';
import { css } from 'react-emotion';
import { SyncLoader } from 'react-spinners';
import FloatingButtons from './FloatingButtons';
import { animateScroll as scroll } from 'react-scroll';
import './index.css';
import connection from '../ShareDB/connection';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LiveTranscriptView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#262A38',
      fontSize: '3em',
      fontFamily: 'Cousine, sans-serif',
      loading: true,
      menuVisible: false,
      textColor: '#F2F2F2'
    };

    this.scrollDown = this.scrollDown.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
  }

  onScrollToBottom(atBottom) {
    if (!atBottom) {
      this.scrollDown();
    }
  }

  onLoaded() {
    this.setState({
      loading: false
    });
  }

  scrollDown() {
    setTimeout(() => {
      scroll.scrollToBottom({
        delay: 0,
        duration: 200,
        isDynamic: true
      });
    }, 0);

    this.setState({
      menuVisible: false
    });
  }

  componentWillUnmount() {
    this.doc.unsubscribe();
    this.doc.destroy();
  }

  render() {
    const { user, event } = this.props.match.params;
    this.doc = connection.get(user, event);

    const style = {
      backgroundColor: this.props.backgroundColor || this.state.backgroundColor,
      fontSize: this.props.fontSize || this.state.fontSize,
      fontFamily: this.props.fontFamily || this.state.fontFamily,
      color: this.props.textColor || this.state.textColor
    };

    return (
      <div className="liveTranscript--container">
        { this.state.menuVisible && !this.state.loading
          ? <FloatingButtons
            scrollDown={ this.scrollDown }
            style={ style } />
          : null
        }
        <div className='sweet-loading'>
          <SyncLoader
            className={ override }
            sizeUnit={ 'px' }
            size={ 13 }
            margin={ '6px' }
            color={ style.color }
            loading={ this.state.loading }
          />
        </div>
        <div className="liveTranscript"
             onClick={ () => {
               this.setState({
                 menuVisible: true
               });
             } }>
          <ShareDBBinding
            cssClass="liveTranscript--text-format"
            style={ style }
            doc={ this.doc }
            onLoaded={ this.onLoaded }
            flag='≈'
            elementType="div" />
        </div>
        <IntersectionObserver
          threshold={ .1 }
          onChange={ state => this.onScrollToBottom(state) }>
          { ({ inView, ref }) => (
            <div ref={ ref }
                 className="liveTranscript--container_observer"
                 style={ { backgroundColor: style.backgroundColor } } />
          ) }
        </IntersectionObserver>
      </div>
    );
  }
}

export default LiveTranscriptView;
