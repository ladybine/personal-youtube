import React from 'react'
import Acceuil from './Acceuil'
import EnTete from '../header/EnTete'
import Like from './Like'
import { Link } from 'react-router-dom'

const ScrenLike = () => {
  return (
    <div>
      <div className="yy">
        <EnTete />
      </div>
      <div className="kk">
        <Acceuil />
        <VideoVue />
      </div>
      <Like/>
    </div>
  );
}

export default ScrenLike