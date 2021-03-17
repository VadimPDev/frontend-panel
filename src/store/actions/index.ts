import * as UserActionCreators from './user'
import * as OrderServerActionCreators from './order'
import * as ServerControlActionCreators from './server'
export default {
    ...UserActionCreators,
    ...OrderServerActionCreators,
    ...ServerControlActionCreators
}