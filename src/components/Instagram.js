import React, { useState, useEffect } from "react"
import styled from "styled-components"

const url = `/.netlify/functions/instagram`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7vmin;
  overflow: hidden;
  box-shadow: 1px 1px 3px 1px;
`
const Card = styled.div`
  flex: 1;
  transition: all 0.7s;
  height: 75vmin;
  position: relative;
  div {
    display: none;
    position: absolute;
    bottom: 0;
    width: 50%;
    color: white;
    white-space: nowrap;
    padding: 20px;
    background: -moz-linear-gradient(
      left,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ); /* FF3.6+ */
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, rgba(0, 0, 0, 0.65)),
      color-stop(100%, rgba(0, 0, 0, 0))
    ); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(
      left,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(
      left,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ); /* Opera 11.10+ */
    background: -ms-linear-gradient(
      left,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ); /* IE10+ */
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=1 );
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.7s;
    filter: grayscale(100%);
    border-left: 1px solid white;
  }
  &:hover {
    flex-grow: 4;
    img {
      filter: grayscale(0);
      border-left: 0px;
    }
    div {
      display: block;
    }
  }
`
function useInstagram() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
  }, [])
  return posts
}

export default function Instagram() {
  const gramz = useInstagram()
  return (
    <Container>
      {gramz.map(gram => (
        <Card>
          <a href={gram.url} key={gram.id}>
            <img src={gram.thumbnail} alt={gram.caption} />
            <div>{gram.caption}</div>
          </a>
        </Card>
      ))}
    </Container>
  )
}
