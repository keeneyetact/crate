// Imports
import axios from 'axios'

// App Imports
import { routeApi } from '../../../setup/routes'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const CRATES_GET_LIST_REQUEST = 'CRATES/GET_LIST_REQUEST'
export const CRATES_GET_LIST_RESPONSE = 'CRATES/GET_LIST_RESPONSE'
export const CRATES_GET_LIST_FAILURE = 'CRATES/GET_LIST_FAILURE'
export const CRATES_GET_REQUEST = 'CRATES/GET_REQUEST'
export const CRATES_GET_RESPONSE = 'CRATES/GET_RESPONSE'
export const CRATES_GET_FAILURE = 'CRATES/GET_FAILURE'

// Actions

// Get list of crates
export function getList(orderBy = 'DESC', isLoading = true, forceRefresh = false) {
  return dispatch => {
    dispatch({
      type: CRATES_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, queryBuilder({
      type: 'query',
      operation: 'crates',
      data: { orderBy },
      fields: ['id', 'name', 'description', 'createdAt', 'updatedAt']
    }))
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: CRATES_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.crates
          })
        } else {
          console.error(response)
        }
      })
      .catch(function (error) {
        dispatch({
          type: CRATES_GET_LIST_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Get single crate
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: CRATES_GET_REQUEST,
      isLoading
    })

    return axios.post(routeApi, queryBuilder({
      type: 'query',
      operation: 'crate',
      data: { slug },
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt']
    }))
      .then((response) => {
        dispatch({
          type: CRATES_GET_RESPONSE,
          error: null,
          isLoading: false,
          item: response.data.data.crate
        })
      })
      .catch((error) => {
        dispatch({
          type: CRATES_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Get single crate by Id
export function getById(crateId) {
  return dispatch => {
    return axios.post(routeApi, queryBuilder({
      type: 'query',
      operation: 'crateById',
      data: { crateId },
      fields: ['id', 'name', 'description']
    }))
  }
}

// Create or update crate
export function createOrUpdate(crate) {
  if (crate.id > 0) {
    return update(crate)
  } else {
    delete crate.id
    return create(crate)
  }
}

// Create crate
export function create(data) {
  return dispatch => {
    return axios.post(routeApi, queryBuilder({
      type: 'mutation',
      operation: 'crateCreate',
      data,
      fields: ['id']
    }))
  }
}

// Update crate
export function update(crate) {
  return dispatch => {
    return axios.post(routeApi, queryBuilder({
      type: 'mutation',
      operation: 'crateUpdate',
      data: crate,
      fields: ['id']
    }))
  }
}

// Remove crate
export function remove(data) {
  return dispatch => {
    return axios.post(routeApi, queryBuilder({
      type: 'mutation',
      operation: 'crateRemove',
      data,
      fields: ['id']
    }))
  }
}
