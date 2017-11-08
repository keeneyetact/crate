// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../ui/grid'
import { H3, H4 } from '../ui/typography'
import Button from '../ui/button'
import { grey, grey2 } from '../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => (
    <div>
        {/* SEO */}
        <Helmet>
            <title>Profile - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid gutter={ false } style={ { backgroundColor: grey } }>
            <GridCell style={ { padding: '2em', textAlign: 'center' } }>
                <H3 font="secondary">Profile</H3>
            </GridCell>
        </Grid>

        <Grid gutter={ false }>
            <GridCell style={ { padding: '2em', textAlign: 'center' } }>
                <H4 style={ { marginBottom: '0.5em' } }>{ props.user.details.name }</H4>

                <p style={ { color: grey2, marginBottom: '2em' } }>{ props.user.details.email }</p>

                <Link to={ userRoutes.subscriptions.path }>
                    <Button theme="primary">Subscription</Button>
                </Link>

                <Button theme="secondary" onClick={ props.logout } style={ { marginLeft: '1em' } }>Logout</Button>
            </GridCell>
        </Grid>
    </div>
)

// Component Properties
Profile.propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

// Component State
function profileState(state) {
    return {
        user: state.user
    }
}

export default connect(profileState, { logout })(Profile)
