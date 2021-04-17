import * as UserActionCreators from './user'
import * as OrderServerActionCreators from './order'
import * as ServerControlActionCreators from './server'
import * as GlobalActionCreators from './global'
export default {
    ...UserActionCreators,
    ...OrderServerActionCreators,
    ...ServerControlActionCreators,
    ...GlobalActionCreators
}