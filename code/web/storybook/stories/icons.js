// Imports
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

// UI Imports
import Icon from '../../src/client/components/ui/icon/Icon'

// Buttons
storiesOf('Icon', module)
    .add('simple', () => (
        <Icon size={ 3 }>face</Icon>
    ))
    .add('color', () => (
        <Icon size={ 3 } style={ { color: 'red' } }>face</Icon>
    ))