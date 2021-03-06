import { when } from 'k-ramel'

export default [
  when('@@krml/LISTENERS>ADDED>INVITE_SPEAKER')((action, store, { router }) => {
    const talkId = router.getParam('talkId')
    const uid = router.getParam('uid')
    store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: talkId })
    store.dispatch({ type: '@@ui/FETCH_USER', payload: uid })
  }),
]
