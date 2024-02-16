import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from './StyledComponents'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibilty = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibilty,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibilty}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibilty}>cancel</Button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
