import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { InstagramSVG, TwitterSVG } from '../../assets/svg'

const InputSocial = ({ defaultActiveKey = 'instagram', ...rest }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)

  const handleClick = (activeKey) => () => {
    setActiveKey(activeKey)
  }

  return (
    <Input
      size="large"
      {...rest}
      addonBefore={
        <>
          <Button
            key="instagram"
            size="large"
            className="text-center"
            icon={<InstagramSVG isActive={activeKey === 'instagram'} />}
            onClick={handleClick('instagram')}
          />
          <Button
            key="twitter"
            size="large"
            className="text-center"
            icon={<TwitterSVG isActive={activeKey === 'twitter'} />}
            onClick={handleClick('twitter')}
          />
        </>
      }
    />
  )
}

export default InputSocial
