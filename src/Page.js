import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'

class Page extends Component<Props> {
  state = {
    clicked: false,
    nextNav: false,
    prevNav: false,
    mouseRight: false,
    mouseLeft: false,
    randomPosX: 0,
    randomPosY: 0,
    index: 0
  }

  componentDidMount() {
    this.setState({
      randomPosX: Math.random() * window.innerWidth / 1.5,
      randomPosY: Math.random() * 300
    })
  }

  setMousePos = (e) => {
    if (e.clientX > window.innerWidth / 1.5 && !this.state.mouseRight) {
      this.setState({ mouseRight: true, mouseLeft: false })
    }
    if (e.clientX < window.innerWidth / 3 && !this.state.mouseLeft) {
      this.setState({ mouseLeft: true, mouseRight: false })
    }
  }

  navPrev = () => {
    this.setState({ prevNav: true })
    setTimeout(() => {
      this.setState({ index: this.state.index === 0 ? this.props.pages.length - 1 : this.state.index - 1, prevNav: false })
    }, 300)
  }

  navNext = () => {
    this.setState({ nextNav: true })
    setTimeout(() => {
      this.setState({ index: this.state.index === this.props.pages.length - 1 ? 0 : this.state.index + 1, nextNav: false })
    }, 300)
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    const { index, clicked, randomPosX, randomPosY, mouseLeft, mouseRight } = this.state
    const { pages } = this.props
    const { title, images } = this.props.pages[index]

    return (
      <Body onMouseMove={this.setMousePos}>
        <TextContainer>
          <NavPrev onClick={this.navPrev} position={clicked}>
            {index === 0 ? pages[pages.length - 1].title : pages[index - 1].title}
          </NavPrev>
          <Back onClick={this.handleClick} position={clicked}>
            x
          </Back> 
          <Title onClick={this.handleClick} position={clicked}>
            {title}
          </Title>
          <NavNext onClick={this.navNext} position={clicked}>
            {index === (pages.length - 1) ? pages[0].title : pages[index + 1].title}
          </NavNext>
        </TextContainer>
        <ImageGrid position={clicked} right={mouseRight} left={mouseLeft}>
          {images.map((number, index) => {
            return (
              <Image
                key={index}
                position={clicked}
                src={`/assets/${number}.jpg`}
                randomXPosition={randomPosX}
                randomYPosition={randomPosY}
              />
            )
          })}
        </ImageGrid>
      </Body>
    )
  }
}

export default Page

const Body = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  justify-items: center;
  align-items: center;
  z-index: 2;
  overflow: hidden;
`

const Title = styled.h1`
  cursor: pointer;
  position: relative;
  margin: 0;
  transform: translateY(${props => props.position ? 100 : 0}%);
  transition: all 0.7s ease;
  text-decoration: underline;

  &:hover {
    text-transform: uppercase;
  }
`

const Back = styled.span`
  cursor: pointer;
  margin: 0;
  transform: translateY(${props => props.position ? 0 : 150}%);
  transition: all 0.7s ease;
  justify-self: end;
`

const navStyles = css`
  cursor: pointer;
  transform: translateY(${props => props.position ? 150 : 0}%);
  transition: all 0.7s ease;
  text-decoration: underline;
  &:hover {
    text-transform: uppercase;
  }
`

const NavNext = styled.span`
  ${navStyles}
  grid-column: 5;
`

const NavPrev = styled.span`
  ${navStyles}
  grid-column: 1;
`

const animation = (pos: number) => keyframes`
  from {
    transform: translateX(0%);
  }

  to {
    transform: ${pos === 1 ? `translateX(1%)` : pos === 2 ? 'translateX(-1%)' : 'translateX(0%)'};
  }
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 33%);
  grid-template-columns: repeat(3, 33%);
  grid-gap: ${props => props.position ? 40 : 60}px;
  align-items: center;
  transition: all 0.8s cubic-bezier(1,0,0,1);
  padding: 20px;
  box-sizing: border-box;
  height: 90%;
  width: 80%;
  margin-top: -100px;
  animation: ${animation(props => props.right ? 1 : props.left ? 2 : 0)} 1.5s ease;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => props.position ? 0 : 0.7};
    transition: opacity 0.8s cubic-bezier(1,0,0,1);
    content: ' ';
    background-color: black;
    z-index: 1;
  }
`

const Image = styled.img`
  transition: all 0.8s cubic-bezier(1,0,0,1);
  transform: ${props => props.position ? 'scale(0.9) translate(0)' : `scale(0.3) translate(${props.randomXPosition}px, ${props.randomYPosition}px)`};

  &:nth-of-type(1) {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    align-self: end;
    transform: ${props => props.position ? 'scale(0.9) translate(0)' : `scale(0.3) translate(-${props.randomXPosition}px, ${props.randomYPosition}px)`};
  }

  &:nth-of-type(2) {
    transform: ${props => props.position ? 'scale(0.9) translate(0)' : `scale(0.3) translate(0, ${props.randomYPosition}px)`};
  }

  &:nth-of-type(3) {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }

  &:nth-of-type(4) {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    transform: ${props => props.position ? 'scale(0.9) translate(0)' : `scale(0.3) translate(-${props.randomXPosition}px, ${props.randomYPosition}px)`};  
  }

  &:nth-of-type(5) {
    grid-column: 2 / 3;
    align-self: stretch;
    justify-self: end;
    transform: ${props => props.position ? 'scale(0.9) translate(0)' : `scale(0.3) translate(${props.randomYPosition}px, ${props.randomXPosition}px)`};
  }

  &:nth-of-type(6) {
    grid-row: 3 / 4;
    grid-column: 3 / 4;
  }

  &:nth-of-type(7) {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
    transform: ${props => props.position ? 'scale(0.9) translate(0)' : `scale(0.3) translate(-${props.randomXPosition}px, ${props.randomYPosition}px)`};
  }
`
