import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import event from 'redux/data/event'
import user from 'redux/data/user'
import { createEvent, fetchEvent } from './event.firebase'

function* createEventForm({ payload }) {
  try {
    // indicate start submitting form
    yield put(startSubmit('event'))

    // get user id
    const { uid } = yield select(user.get())

    // create event into database
    const ref = yield call(createEvent, payload, uid)

    // go to event page
    yield put(push(`/organizer/event/${ref.id}`))

    // set form submitted
    yield put(reset('event'))
    yield put(stopSubmit('event'))
  } catch (error) {
    // set errors to the form
    console.error(error)
    yield put(stopSubmit('event', { _error: error.message }))
  }
}

function* getEvent() {
  try {
    // get event id from router
    const { id } = yield select(state => state.router.params)

    // check if already in the store
    const current = yield select(event.get())
    if (current && current.id === id) {
      return
    }

    // wipe current event in the store
    yield put(event.reset())

    // fetch event from id
    const ref = yield call(fetchEvent, id)
    if (ref.exists) {
      yield put(event.set({ id, ...ref.data() }))
    } else {
      console.error(`event with id ${id} not found`)
    }
  } catch (error) {
    console.error(error)
  }
}

export default function* eventSagas() {
  yield takeLatest('CREATE_EVENT_FORM', createEventForm)
  yield takeLatest('FETCH_EVENT', getEvent)
}
